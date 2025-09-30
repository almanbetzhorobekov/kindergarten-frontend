const vorname = document.getElementById("vorname");
const nachname = document.getElementById("nachname");
const telefon = document.getElementById("telefon");
const geburtsdatum = document.getElementById("geburtsdatum");
const gruppe = document.getElementById("gruppe");
const childrenList = document.getElementById("childrenList");


const submit = document.getElementById("submit");
const message = document.getElementById("message");

document.querySelector("#vorname + .error").textContent = "Bitte Vorname eingeben!";
document.querySelector("#vorname + .error").textContent = "";

document.querySelector("#nachname + .error").textContent = "Bitte Nachname eingeben!";
document.querySelector("#nachname + .error").textContent = "";

document.querySelector("#telefon + .error").textContent = "Bitte Telefon Nummer eingeben!";
document.querySelector("#telefon + .error").textContent = "";
