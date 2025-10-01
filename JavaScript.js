let currentLanguage = "";
const languageSelect = document.getElementById("languageSelect");
const dictionarySection = document.getElementById("dictionarySection");
const dictionaryTitle = document.getElementById("dictionaryTitle");
const addWordFormEnglish = document.getElementById("addWordFormEnglish");
const addWordFormSpanish = document.getElementById("addWordFormSpanish");
const wordCards = document.getElementById("wordCards");

// --- Language Selection ---
function selectLanguage(language) {
    currentLanguage = language;
    languageSelect.style.display = "none";
    dictionarySection.style.display = "block";
    
    dictionaryTitle.textContent = language === "english" ? "English Dictionary" : "Spanish Dictionary";

    // Show the correct form
    addWordFormEnglish.style.display = "none";
    addWordFormSpanish.style.display = "none";

    displaySavedWords();
}

// --- Go Back ---
function goBack() {
    dictionarySection.style.display = "none";
    languageSelect.style.display = "block";
    addWordFormEnglish.style.display = "none";
    addWordFormSpanish.style.display = "none";
    wordCards.innerHTML = "";
}

// --- Toggle Add Word Form ---
function toggleAddWord() {
    if(currentLanguage === "english") {
        addWordFormEnglish.style.display = addWordFormEnglish.style.display === "none" ? "block" : "none";
    } else {
        addWordFormSpanish.style.display = addWordFormSpanish.style.display === "none" ? "block" : "none";
    }
}

// --- English Form Submit ---
document.getElementById("wordFormEnglish").addEventListener("submit", function(e){
    e.preventDefault();
    const wordObj = {
        word: document.getElementById("wordEn").value,
        translation: document.getElementById("translationEn").value,
        synonyms: document.getElementById("synonymsEn").value,
        meanings: document.getElementById("meaningsEn").value,
        region: document.getElementById("regionEn").value,
        formality: document.getElementById("formalityEn").value,
        age: document.getElementById("ageEn").value,
        example: document.getElementById("exampleEn").value
    };
    saveWord(wordObj);
    addWordCard(wordObj);
    document.getElementById("wordFormEnglish").reset();
});

// --- Spanish Form Submit ---
document.getElementById("wordFormSpanish").addEventListener("submit", function(e){
    e.preventDefault();
    const wordObj = {
        word: document.getElementById("wordEs").value,
        translation: document.getElementById("translationEs").value,
        synonyms: document.getElementById("synonymsEs").value,
        meanings: document.getElementById("meaningsEs").value,
        region: document.getElementById("regionEs").value,
        formality: document.getElementById("formalityEs").value,
        age: document.getElementById("ageEs").value,
        example: document.getElementById("exampleEs").value
    };
    saveWord(wordObj);
    addWordCard(wordObj);
    document.getElementById("wordFormSpanish").reset();
});

// --- LocalStorage Functions ---
function getStoredWords() {
    const stored = localStorage.getItem(currentLanguage);
    return stored ? JSON.parse(stored) : [];
}

function saveWord(wordObj) {
    const words = getStoredWords();
    words.push(wordObj);
    localStorage.setItem(currentLanguage, JSON.stringify(words));
}

function displaySavedWords() {
    wordCards.innerHTML = "";
    const words = getStoredWords();
    words.forEach(word => addWordCard(word));
}

// --- Add Card ---
function addWordCard(word) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3 class="word">${word.word}</h3>
        <img class="image" src=" ${getFlag(word.region)}" alt="">
        <p class="translation"><strong>Translation:</strong> ${word.translation}</p>
        <p class="synonyms"><strong>Synonyms:</strong> ${word.synonyms}</p>
        <p class="meaning"><strong>Meanings/Uses:</strong> ${word.meanings}</p>
        <p class="formality"><strong>Formality:</strong> ${word.formality}</p>
        <p class="age"><strong>Old-fashioned/Modern:</strong> ${word.age}</p>
        <p class="example"><strong>Example:</strong> ${word.example}</p>
    `;

    wordCards.appendChild(card);
}

// --- Flags ---
function getFlag(region) {
    switch(region) {
        case "british": return "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/330px-Flag_of_the_United_Kingdom.svg.png";
        case "american": return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png";
        case "australian": return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1200px-Flag_of_Australia_%28converted%29.svg.png";
        case "global": return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/World_Flag_%282004%29.svg/1200px-World_Flag_%282004%29.svg.png";
        case "spain": return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png";
        case "mexico": return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1200px-Flag_of_Mexico.svg.png";
        case "latinAmerica": return "https://static.wikia.nocookie.net/differenthistory/images/f/f1/Latin_America_flag.png/revision/latest?cb=20170106164021";
        default: return "";
    }
}
