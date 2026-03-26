const apiBase = "http://localhost:8080/api/kindergartens";

async function getKindergartens() {

    const section = document.getElementById("kindergarten-list");
    section.innerHTML ="Lade Daten...";

    try {
        const res = await fetch(apiBase);
        if (res.status === 204) {
            section.innerHTML = "Keine Kindergärten vorhanden."
            return;
        }

        if (!res.ok) {
            section.innerHTML = "Fehler beim Laden der Kindergärten!";
            return;
        }

        const data = await res.json();
        section.innerHTML = "";

        data.forEach(k => {
            const div = document.createElement("div");
            div.classList.add("Kindergarten-card");
            div.innerHTML = `
                <h3>${k.kindergartenName}</h3>
                <p><strong>Straße:</strong> ${k.addressDTO?.street ?? "-"}</p>
                <p><strong>Hausnummer:</strong> ${k.addressDTO?.houseNumber ?? "-"}</p>
                <p><strong>PLZ:</strong> ${k.addressDTO?.plz ?? "-"}</p>
                <hr>
            `;
            section.appendChild(div);
        });

    } catch (error) { 
        section.innerHTML = "Vervindungsfehler zum Server.";
        console.error("Fehler:", error);
    }
}

//neue Kindergartens
document
    .getElementById("kindergarten-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const kindergarten = {
            kindergartenName: document.getElementById("name").value,
            addressDTO: {
                street: document.getElementById("street").value,
                houseNumber: document.getElementById("houseNumber").value,
                plz: document.getElementById("plz").value
            }
        };

        try {
            const res = await fetch(apiBase, {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(kindergarten)
            });

            if (res.ok) {
                alert("Kindergarten erfolgreich erstellt!");
                e.target.reset();
                getKindergartens();
            } else {
                alert("Fehler beim erstellen des Kindergartens!")
            }

        } catch (error){
            alert("Fehler beim verbindung zum Server!")
            console.error("Fehler: ", error);

        }
    });

document
.getElementById("load-kindergartens")
.addEventListener("click", getKindergartens);

getKindergartens();




