const form = document.getElementById("childForm");//Holt das formular
const vorname = document.getElementById("vorname");
const nachname = document.getElementById("nachname");
const telefon = document.getElementById("telefon");
const geburtsdatum = document.getElementById("geburtsdatum");
const gruppe = document.getElementById("gruppe");
const childrenList = document.getElementById("childrenList");

let children = JSON.parse(localStorage.getItem("children")) || []; // JSON.parse macht aus String wieder Array
renderChildren();//Liste beim Laden direct anzeigen

form.addEventListener("submit", function(event) {
    event.preventDefault(); //Enthält Informationen über das Ereignis (Klick, Formularabsendung usw.).

    clearErrors();

    let isValid = true;

    if(vorname.value.trim() === "") {
        showError(vorname, "Bitte Vorname eingeben!");
        isValid = false;
    }

    if (nachname.value.trim() === "") {
        showError(nachname, "Bitte Nachname eingeben!");
        isValid = false;
    }

    const germanPhoneNumberRegex = /^\+49[1-9][0-9]{1,14}$/;
    //Ich kann nicht DE Telefonnummer richtig prüfen(
    if (!germanPhoneNumberRegex.test(telefon.value.trim())) {
        showError(telefon, "Bitte gültige Telefonnummer (7–15 Ziffern) eingeben!");
        isValid = false;  
    }

    const geburtsDatumValue = new Date(geburtsdatum.value);
    const heute = new Date();
    const alter = heute.getFullYear() - geburtsDatumValue.getFullYear();

    if (geburtsdatum.value === "" || geburtsDatumValue >= heute) {
        showError(geburtsdatum, "Geburtsdatum muss in der Vergangenheit liegen!");
        isValid = false;
    } else if (alter < 1) {
        showError(geburtsdatum, "Kind muss mindestens 1 Jahr alt sein!");
        isValid = false;
    } else if (alter > 7) {
        showError(geburtsdatum, "Kind darf nicht älter als 7 Jahre sein!");
        isValid = false;
    }

    if (gruppe.value === "") {
        showError(gruppe, "Bitte eine Gruppe auswählen!");
        isValid = false;
    }

    if(!isValid) return; //Wenn ist fehler machen wir return!

    const kind = {
        vorname: vorname.value,
        nachname: nachname.value,
        telefon: telefon.value,
        geburtsdatum: geburtsdatum.value,
        gruppe: gruppe.value
    };

    children.push(kind);
    localStorage.setItem("children", JSON.stringify(children));//Wandelt ein Objekt in einen String um, um es zu speichern

    renderChildren();

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

//Eine Liste zeigen
function renderChildren() {
    childrenList.innerHTML = "";
    children.forEach((child) => {
        const li = document.createElement("li");
        li.classList.add("child-card");
        li.innerHTML = `
            <p><strong>${child.vorname} ${child.nachname}</strong></p>
            <p>Geburtsdatum: ${child.geburtsdatum}</p>
            <p>Tel: ${child.telefon}</p>
            <p>Gruppe: <span class="gruppe-${child.gruppe.toLowerCase()}">${child.gruppe}</span></p>
        `;
        childrenList.appendChild(li);
    });
}

//localStorage.clear();

document.getElementById("clearButton").addEventListener("click", function () {
    localStorage.removeItem("children");
    document.getElementById("childrenList").innerHTML = "";
});



