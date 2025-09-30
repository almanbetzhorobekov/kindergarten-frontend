document.addEventListener("DOMContentLoaded", function() {
    const children = JSON.parse(localStorage.getItem("children")) || [];

    children.forEach(child => {
        const card = document.createElement("article");
        card.classList.add("child-card");
        card.innerHTML = `
            <h3>${child.vorname} ${child.nachname}</h3>
            <p>Alter: ${calculateAge(child.geburtsdatum)} Jahre</p>
        `;

    
        const groupId = "gruppe-" + child.gruppe.toLowerCase();
        const groupSection = document.getElementById(groupId);

        if (groupSection) {
            groupSection.appendChild(card);
        } else {
            console.warn("Keine Gruppe gefunden für:" , child.gruppe)
        }
    });
});

function calculateAge(geburtsdatum) {
    const birthDate = new Date(geburtsdatum);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/*document.getElementById("clearButton").addEventListener("click", function () {
    localStorage.removeItem("children");
    children = [];
    alert("Alle Kinder gelöscht!");
});
*/
