// API endpoints
const apiBase = "http://localhost:8080/api";
const apiKindergartens = `${apiBase}/kindergartens`;
const apiGroups = `${apiBase}/groups`;
const apiEducators = `${apiBase}/educators`;


// DOM el
const kindergartenSelect = document.getElementById("kindergartenSelect");
const groupSelect = document.getElementById("groupSelect");
const form = document.getElementById("educator-form");
const educatorList = document.getElementById("educator-list");

async function loadKindergartens() {
    try {
        const response = await fetch(apiKindergartens);
        if (!response.ok) throw new Error("Error loading kindergartens");

        const kindergartens = await response.json();
        kindergartenSelect.innerHTML = `<option value="">Wähle Kindergarten</option>`;

        kindergartens.forEach(kita => {
            const option = document.createElement("option");
            option.value = kita.uuid;
            option.textContent = kita.kindergartenName;
            kindergartenSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading kindergartens:", error);
    }
}

async function loadGroupsByKindergarten(kindergartenId) {
    try {
        if (!kindergartenId) {
            groupSelect.innerHTML = `<option value="">Bitte Kindergarten wählen...</option>`;
            return;
        }

        const response = await fetch(`${apiGroups}/by-kindergarten/${kindergartenId}`);
        if (!response.ok) throw new Error("Error loading groups");

        const groups = await response.json();
        groupSelect.innerHTML = `<option value="">Bitte die Gruppe auswählen...</option>`;

        groups.forEach(group => {
            const option = document.createElement("option");
            option.value = group.uuid;
            option.textContent = group.groupName;
            groupSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading groups:", error);
    }
}


async function loadEducators() {
    try {
        const response = await fetch(apiEducators);
        if (!response.ok) throw new Error("Error loading educators");

        const educators = await response.json();
        educatorList.innerHTML = "";

        if (!educators.length) {
            educatorList.textContent = "Keine Erzieher vorhanden.";
            return;
        }

        educators.forEach(educator => {
            const div = document.createElement("div");
            div.classList.add("educator-card");
            div.innerHTML = `
                <h3>${educator.firstName} ${educator.lastName}</h3>
                <p>Alter: ${educator.age ?? "-"}</p>
                <p>Adresse: ${educator.addressDTO?.street ?? "-"} ${educator.addressDTO?.houseNumber ?? ""}, ${educator.addressDTO?.plz ?? ""}</p>
            `;
            educatorList.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading educators:", error);
    }
}

// Form submit — create educator
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const educatorData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        birthday: document.getElementById("birthday").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        addressDTO: {
            street: document.getElementById("street").value,
            houseNumber: document.getElementById("houseNumber").value,
            plz: document.getElementById("plz").value,
        },
        kindergartenId: kindergartenSelect.value,
        groupIds: [groupSelect.value] 
    };

    console.log("Sende Educator-Daten:", educatorData);

    try {
        const response = await fetch(apiEducators, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(educatorData),
        });

        if (response.ok) {
            alert("Erzieher erfolgreich erstellt!");
            form.reset();
            await loadEducators();
        } else {
            const errorText = await response.text();
            console.error("Error creating educator:", errorText);
            alert("Fehler beim Erstellen des Erziehers!");
        }
    } catch (error) {
        console.error("Error sending educator:", error);
        alert("Verbindungsfehler beim Erstellen des Erziehers!");
    }
});

kindergartenSelect.addEventListener("change", (e) => {
    const kindergartenId = e.target.value;
    loadGroupsByKindergarten(kindergartenId);
});

document.addEventListener("DOMContentLoaded", async () => {
    await loadKindergartens();
    await loadEducators();
});