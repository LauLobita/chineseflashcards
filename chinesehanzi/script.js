let known = [];
let toReview = [];

let characters = [];
let currentIndex = 0;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        characters = data;
        showCard(); // Affiche la première carte dès que les données sont chargées
    })
    .catch(error => console.error("Erreur lors du chargement des données :", error));

let currentChar = null;
let currentMode = 'hanzi'; // 'hanzi' or 'pinyin'

function getRandomCharacter() {
    let randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

function setMode(mode) {
    let char = getRandomCharacter();
    if (mode === 'hanzi') {
        document.getElementById("display").innerHTML = `<strong>${char.hanzi}</strong>`;
    } else if (mode === 'pinyin') {
        document.getElementById("display").innerHTML = `<em>${char.pinyin}</em>`;
    } else {
        document.getElementById("display").innerHTML = "";
    }
    document.getElementById("answer").innerHTML = ""; // vide la réponse précédente
    document.getElementById("display").dataset.currentChar = JSON.stringify(char);
}


function showAnswer() {
    let currentChar = document.getElementById("display").dataset.currentChar;
    if (currentChar) {
        let char = JSON.parse(currentChar);
        document.getElementById("answer").innerHTML = `<strong>${char.hanzi}</strong> — <em>${char.pinyin}</em> — ${char.translation || char.english}`;
    } else {
        document.getElementById("answer").innerHTML = "Clique sur 'Show Hanzi' ou 'Show Pinyin' d'abord !";
    }
}


    function markKnown() {
        let currentChar = document.getElementById("display").dataset.currentChar;
        if (!currentChar) return alert("Clique sur un caractère d'abord !");
        let char = JSON.parse(currentChar);
    
        // Vérifie si déjà dans known
        if (!known.find(c => c.hanzi === char.hanzi)) {
            known.push(char);
            // Supprime de toReview si présent
            toReview = toReview.filter(c => c.hanzi !== char.hanzi);
            updateProgress();
        }
    }
    
    function markToReview() {
        let currentChar = document.getElementById("display").dataset.currentChar;
        if (!currentChar) return alert("Clique sur un caractère d'abord !");
        let char = JSON.parse(currentChar);
    
        // Vérifie si déjà dans toReview
        if (!toReview.find(c => c.hanzi === char.hanzi)) {
            toReview.push(char);
            // Supprime de known si présent
            known = known.filter(c => c.hanzi !== char.hanzi);
            updateProgress();
        }
    }
    
    function updateProgress() {
        let total = characters.length;
        let knownCount = known.length;
        let reviewCount = toReview.length;
    
        // Met à jour le texte
        document.getElementById("progress").innerHTML = 
          `Total: ${total} | Connus: ${knownCount} | À revoir: ${reviewCount}`;
    
        // Met à jour la barre de progression
        let knownPercent = (knownCount / total) * 100;
        let reviewPercent = (reviewCount / total) * 100;
    
        document.querySelector(".progress-bar.known").style.width = knownPercent + "%";
        document.querySelector(".progress-bar.review").style.width = reviewPercent + "%";
    }
    


// Initialisation
updateProgressBar();

 

