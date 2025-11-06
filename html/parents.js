const form = document.getElementById("parents-form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phoneNumber = document.getElementById("phoneNumber");
const birthday = document.getElementById("birthday");

const street = document.getElementById("street");
const houseNumber = document.getElementById("houseNumber");
const plz = document.getElementById("plz");

const apiChildren = "http://localhost:8080/api/children";
const apiParents = "http://localhost:8080/api/parents";

async function loadChildren() {
    try {
        const response = await fetch(apiChildren);
        const children = await response.json();

        const select = document.getElementById("childSelect");
        select.innerHTML = '<option value="">-- Wähle ein Kind --</option>';

        children.forEach(child => {
            const option = document.createElement("option");
            option.value = child.uuid;
            option.textContent = `${child.firstName} ${child.lastName}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Fehler beim Laden der Kinder:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadChildren);

form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    if (!validateForm()) return;

    const parentData = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        birthday: birthday.value,
        phoneNumber: phoneNumber.value.trim(),
        addressDTO: {
            street: street.value.trim(),
            houseNumber: houseNumber.value.trim(),
            plz: plz.value.trim(),
        }
    };

    console.log("Send parent:", parentData);

    fetch(apiParents, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parentData)
    })
        .then(res => {
            if (!res.ok) throw new Error("Error saving parent!");
            return res.json();
        })
        .then(data => {
            alert(`Parent "${data.firstName} ${data.lastName}" successfully registered!`);
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
    if (birthday.value === "") {
        showError(birthday, "Bitte Geburtsdatum eingeben!");
        isValid = false;
    }
    if (phoneNumber.value.trim() === "") {
        showError(phoneNumber, "Bitte Telefonnummer eingeben!");
        isValid = false;
    }
    if (street.value.trim() === "") {
        showError(street, "Bitte Straße eingeben!");
        isValid = false;
    }
    if (houseNumber.value.trim() === "") {
        showError(houseNumber, "Bitte Hausnummer eingeben!");
        isValid = false;
    }
    if (plz.value.trim() === "" || !/^\d{5}$/.test(plz.value)) {
        showError(plz, "Bitte gültige PLZ eingeben!");
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