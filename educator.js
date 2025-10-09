const apiBase = "http://localhost:8080/api/educators";

async function getEducators() {
    const res = await fetch(apiBase); 
    const section = document.getElementById("educator-list");

    if (res.status === 204) {
        section.innerHTML = "Keine Erzieher vorhanden.";
        return;
    }

    const data = await res.json();
    section.innerHTML = "";

    data.forEach(educator => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${educator.firstName} ${educator.lastName}</h3>
            <p>Alter: ${educator.age}</p>
            <p>Adresse: ${educator.addressDTO?.street ?? "-"} ${educator.addressDTO?.houseNumber ?? ""}, ${educator.addressDTO?.plz ?? ""}</p>
        `;
        section.appendChild(div);
        console.log();
    });
}

document.getElementById("educator-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const educator = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: parseInt(document.getElementById("age").value),
        addressDTO: {
            street: document.getElementById("street").value,
            plz: document.getElementById("plz").value,
            houseNumber: document.getElementById("houseNummer").value
        },
        groupIds: []
    };

    const res = await fetch(apiBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(educator)
    });

    if(res.ok) {
        alert("Erzieher erfolgreich erstellt!");
        e.target.reset();
        getEducators();
    } else {
        alert("Gehler beim Erstellen des Erziehers!!!");
    }
    console.log();
});

getEducators();