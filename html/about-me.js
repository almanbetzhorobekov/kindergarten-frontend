const newGameInput = document.getElementById("newGame");//neu Spiel
const addBtn = document.getElementById("addBtn");//
const message = document.getElementById("message");//Fehler meldung oder information geben
const searchInput = document.getElementById("search");//Spiel suchen

//wenn clicken wir dann ruft die function addGame an
addBtn.addEventListener("click", addGame);
//oder mit Enter
newGameInput.addEventListener("keydown", e=> {
    if (e.key === "Enter") {
        addGame();
    } 
});
//addGame fucntion 
function addGame() {
    const gameName = newGameInput.value.trim();//Nehmen wir die Text und entferen wir space
    //prüfen wir wenn die Feld ist lehr
    if (gameName === "") {
        message.textContent = "Bitte geben Sie ein Spiel ein!"
        return;
    }

    const gameList = document.getElementById("gameList"); 
    const items = gameList.getElementsByTagName("li"); //Alle Elementen in der Liste
    //prüfen wir gibt es gleiche Spiele in der Liste
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.toLowerCase() === gameName.toLowerCase()) { //wenn gibt es geben wir die Information
            message.textContent = "Diese Spiel wurde bereits hinzugefügt!";
            return;
        }
    }

    const li = document.createElement("li");
    li.textContent = gameName;
    li.addEventListener("click", ()=> {
        li.classList.toggle("starred");
        saveStars();
    })

    gameList.appendChild(li);

    newGameInput.value = "";
    message.textContent = "";
}

searchInput-addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const items = gameList.getElementsByTagName("li");

    for (let i = i < items.length; i++;) {
        const text = items[i].textContent.toLowerCase();
        if (text.includes(query)) {
            items[i].style.display = ""; //zeigen
        } else {
            items[i].style.display = "none";
        }
    }
});

function saveStars() {
    const items = gameList.getElementsByTagName("li");
    const starred = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("starred")) {
            starred.push(items[i].textContent);
        }
    }
    localStorage.setItem("starredGames", JSON.stringify(starred));
}

function loadStars() {
    const starred = JSON.parse(localStorage.getItem("starredGames") || "[]");
    const items = gameList.getElementsByTagName("li");

    for (let i = 0; i < items.length; i++) {
        if (starred.includes(items[i].textContent)) {
            items[i].classList.add("starred");
        }

        items[i].addEventListener("click", () => {
            items[i].classList.toggle("starres");
            saveStars();
        });
    }
}

loadStars();


