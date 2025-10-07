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

const groupList = document.querySelector(".groups");

async function loadGroups() {
    try {const response = await fetch('http://localhost:8080/api/groups');
    const groups = await response.json()
    console.log(groups);

    groupList.innerHTML = "";

    groups.forEach(group => {
        const section = document.createElement("section");
        section.classList.add("group");

        section.dataset.uuid = group.uuid;

        section.innerHTML = `
        <h2>${group.groupName}</h2>
        <p>Erzieher: ${group.educatorId ?? "—"}</p>
    `;
    groupList.appendChild(section);
  });

    } catch (error) {
        console.error("Fehler beim laden der Gruppen: ", error) 
    }
}

window.onload = loadGroups;
