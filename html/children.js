const form = document.getElementById("childForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const birthday = document.getElementById("birthday");
const kindergartenSelect = document.getElementById("kindergartenSelect");
const groupSelect = document.getElementById("groupSelect");
const clearButton = document.getElementById("clearButton");

const apiKindergartens = "http://localhost:8080/api/kindergartens";
const apiGroups = "http://localhost:8080/api/groups";
const apiChildren = "http://localhost:8080/api/children";

async function loadKindergartens() {
    try {
        const response = await fetch(apiKindergartens);
        if (!response.ok) throw new Error("Error loading kindergartens!");

        const kindergartens = await response.json();
        kindergartenSelect.innerHTML = '<option value="">--Kindergarten auswählen --</option>';

        kindergartens.forEach(kita => {
            const option = document.createElement("option");
            option.value = kita.uuid;
            option.textContent = kita.kindergartenName;
            kindergartenSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading kindergartens:", error);
        alert("Could not load kindergartens!");
    }
}

kindergartenSelect.addEventListener("change", function() {
    const kindergartenId = this.value;
    groupSelect.innerHTML = "<option value=''>Please select a group...</option>";

    if (!kindergartenId) return;

    fetch(`${apiGroups}/by-kindergarten/${kindergartenId}`)
        .then(res => {
            if (!res.ok) throw new Error("Error loading groups!");
            return res.json();
        })
        .then(groups => {
            console.log("Groups loaded from backend:", groups);
            groupSelect.innerHTML = "<option value=''>Please select a group...</option>";
            groups.forEach(g => {
                const option = document.createElement("option");
                option.value = g.uuid;
                option.textContent = g.groupName;
                groupSelect.appendChild(option);
            });
        })
        .catch(err => console.error(err.message));
});

// send Child
form.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors();

    if (!validateForm()) return;

    const child = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        birthday: birthday.value,
        groupId: groupSelect.value
    };

    console.log("Send child: ", child);

    fetch(apiChildren, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(child)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error saving child!");
        return res.json();
    })
    .then(data => {
        alert(`Child "${data.firstName} ${data.lastName}" was successfully registered!`);
        form.reset();
    })
    .catch(err => alert(err.message));
});

function validateForm() {
    let isValid = true;
    if (firstName.value.trim() === "") {
        showError(firstName, "Bitte Vorname eingeben!");
        isValid = false;
    }
    if (lastName.value.trim() === "") {
        showError(lastName, "Bitte Nachname eingeben!");
        isValid = false;
    }
    const birthdayValue = new Date(birthday.value);
    const today = new Date();
    const age = today.getFullYear() - birthdayValue.getFullYear();
    if (birthday.value === "" || birthdayValue >= today) {
        showError(birthday, "Geburtsdatum muss in der Vergangenheit liegen!");
        isValid = false;
    } else if (age < 1 || age > 6) {
        showError(birthday, "Kind muss zwischen 1 und 6 Jahre alt sein!");
        isValid = false;
    }
    if (groupSelect.value === "") {
        showError(groupSelect, "Bitte eine Gruppe auswählen!");
        isValid = false;
    }
    return isValid;
}

function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    if (errorSpan) errorSpan.textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(span => span.textContent = "");
}

clearButton.addEventListener("click", () => {
    alert("Diese Funktion löscht keine Daten vom Server.");
});

window.onload = () => {
    loadKindergartens();
};



