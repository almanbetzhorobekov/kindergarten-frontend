const form = document.getElementById("childForm");
const vorname = document.getElementById("vorname");
const nachname = document.getElementById("nachname");
const telefon = document.getElementById("telefon");
const geburtsdatum = document.getElementById("geburtsdatum");
const gruppe = document.getElementById("gruppe");

let children = JSON.parse(localStorage.getItem("children")) || [];

form.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    if (vorname.value.trim() === "") {
        showError(vorname, "Bitte Vorname eingeben!");
        isValid = false;
    }

    if (nachname.value.trim() === "") {
        showError(nachname, "Bitte Nachname eingeben!");
        isValid = false;
    }

    const germanPhoneNumberRegex = /^\+49[1-9][0-9]{1,14}$/;
    if (!germanPhoneNumberRegex.test(telefon.value.trim())) {
        showError(telefon, "Bitte gültige Telefonnummer eingeben!");
        isValid = false;  
    }

    const geburtsDatumValue = new Date(geburtsdatum.value);
    const today = new Date();
    const age = today.getFullYear() - geburtsDatumValue.getFullYear();

    if (geburtsdatum.value === "" || geburtsDatumValue >= today) {
        showError(geburtsdatum, "Geburtsdatum muss in der Vergangenheit liegen!");
        isValid = false;
    } else if (age < 1) {
        showError(geburtsdatum, "Kind muss mindestens 1 Jahr alt sein!");
        isValid = false;
    } else if (age > 7) {
        showError(geburtsdatum, "Kind darf nicht älter als 7 Jahre sein!");
        isValid = false;
    }

    if (gruppe.value === "") {
        showError(gruppe, "Bitte eine Gruppe auswählen!");
        isValid = false;
    }

    if (!isValid) return;

    const kind = {
        vorname: vorname.value,
        nachname: nachname.value,
        telefon: telefon.value,
        geburtsdatum: geburtsdatum.value,
        gruppe: gruppe.value
    };

    let children = JSON.parse(localStorage.getItem("children")) || [];
    children.push(kind);
    localStorage.setItem("children", JSON.stringify(children));
    console.log(children);

    alert("Kind erfolgreich in Gruppe " + kind.gruppe + " gespeichert!");
    form.reset();
});

function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(span => {
        span.textContent = "";
    });
}

document.getElementById("clearButton").addEventListener("click", function () {
    localStorage.removeItem("children");
    children = [];
    alert("Alle Kinder gelöscht!");
});



