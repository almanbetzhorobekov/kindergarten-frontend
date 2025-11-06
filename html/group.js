const groupList = document.querySelector(".groups");
const apiGroups = "http://localhost:8080/api/groups";
const apiKindergartens = "http://localhost:8080/api/kindergartens";
const select = document.getElementById("kindergarten-select");
const form = document.getElementById("group-form");

async function loadKindergartens() {
    try {
        const response = await fetch(apiKindergartens);
        const kindergartens = await response.json();

        select.innerHTML = '<option value="">-- Wähle Kindergarten --</option>';

        kindergartens.forEach(kita => {
            const option = document.createElement("option");
            option.value = kita.uuid; // UUID
            option.textContent = kita.kindergartenName; // показываем только имя
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Fehler beim Laden der Kindergärten:", error);
    }
}

form.addEventListener("submit", async (e)=> {
    e.preventDefault();

    const name = document.getElementById("group-name").value;
    const kindergartenId = select.value;

    if (!kindergartenId) {
        alert("Bitte wähle einen Kindergarten!");
        return
    }

    const newGroup = { 
        groupName: name, 
        kindergartenId: kindergartenId || null,
        educatorId: null      
    }; 

    try {
        const response = await fetch(apiGroups, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newGroup)
        });

        if (response.ok) {
            alert("Gruppe erfolgreich erstellt");
            form.reset();
            loadGroups();
        } else {
            const error = await response.text();
            alert("Fehler: " + error);
        }
    } catch (error) {
        console.error("Fehler beim Erstellen der Gruppe: ", error);
    }
});

//Gruppen laden
async function loadGroups() {
    try {
        const res = await fetch(apiGroups);
        const groups = await res.json();

        groupList.innerHTML = "";

        groups.forEach(group => {
            const section = document.createElement("section");
            section.classList.add("group");
            section.dataset.uuid = group.id;

            section.innerHTML = `
                <h2> ${group.groupName}</h2>
                <p>Kindergarten: ${group.kindergartenName ?? "-"}</p>
                `;

                groupList.appendChild(section);
            });
    } catch (error) {
        console.error("Feheler beim Laden der Gruppen: ", error);
    }
    
}

window.onload = () => {
    loadGroups();
    loadKindergartens();
}
