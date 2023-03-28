// ----------------------------- S P I E L E R   N A M E   A E N D E R N -------------------------------------
// Die funktion wird als erstes abgerufen, direkt nachdem die seite geladen wurde
changePlayerName();

function changePlayerName() {
  // prompt erstellt eine "alert"-box mit einem eingabefeld, wo die eingabe dann in der variable "name" gespeichert wird.
  let name = prompt("Geben Sie Ihren Spielernamen ein: ");
  // die funktion holt sich dann den element aus der html datei, wo das ID = "spieler" und fuegt dort den eingebenen Namen hinzu. 
  document.getElementById("spieler").innerHTML = name;
}



// ----------------------- C O U N T E R   I N   H T M L   E L E M E N T   D I S P L A Y E N ------------------
let intervalId;

function startCounter() {
  // counter initialisieren mit 0 als anfagswert
  let counter = 0;
  // den element aus html holen, wo id = zeitCounter ist
  const div = document.getElementById('zeitCounter');

  // set an interval that increments by 1 each second
  // diese schreibweise wird verwendet weil hier counter immer incrementiert wird. die incrementation wird nicht richtig dargestellt wenn ich sie als setInterval(counter, 1000) schreiben wuerde
  intervalId = setInterval(() => {
    counter++;
    div.innerText = `${counter}`; // ${} = template literal: eine art um strings und variablen gemeinsam zu verbinden ohne +. In diesem Fall nicht noetig, aber good to know.
  }, 1000);
}


// ----------------------- K A R T E N S P I E L   B E H A N D E L E N ------------------

// in einem array werte 1-16 speichern, weil das die bildernamen repraesentieren
const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// Shuffle cardValues array mit Fisher-Yates (Knuth) Shuffle algorithm
for (let i = cardValues.length - 1; i > 0; i--) { // i: durchläuft karten vom Ende vom array bis anfang
  const j = Math.floor(Math.random() * (i + 1));  // j: Zufallszahl (floor gibt eine Zahl ohne kommastellen (?))
  [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]]; // karten an stelle i & j vertauschen
}


// select all elements von html wo klasse = karte
const cardElements = document.querySelectorAll('.karte');
// variablen, in denen die 2 aufgedeckten karten zwischengespeichert werden
let firstCard = null;
let secondCard = null;

// fuer jede karte soll am anfang das blaue bild gesetzt werden, karten klickbar machen mit addEventListener -> click calls fkt handleCardClick 
cardElements.forEach((card, index) => {
  card.dataset.value = cardValues[index];
  card.style.backgroundImage = `url('./pics/memoryBg.png')`; // Initially display memoryBg.png
  card.addEventListener('click', handleCardClick);
});

// ------

// gameStarted prueft ob das spiel gestartet wurde, damit erst da der zeitCounter startet
let gameStarted = false;

// anzahl versuche mitspeichern
let tries = 0;
const anzahlVersucheElement = document.getElementById("anzahlVersuche");

// ------ Funktion, die das clicken einer karte verarbeitet:
function handleCardClick() {
  // als erstes pruefen, ob das die erste karte ist, die geklickt wurde, damit dann der zeit counter startet
  if (!gameStarted) {
    startCounter();
    gameStarted = true;
  }
  if (this === firstCard) {
    return;
  }

  // Flip the card by adding the "flip" class
  this.classList.add('flip');

  // Update the background image to show the card value
  const cardValue = this.dataset.value;
  this.style.backgroundImage = `url('./pics/card${cardValue}.png')`;

  // wenn firstCard noch keinen wert hat, setze sie gleich die geklickte karte
  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  // anzahl versuche erhoehen nach dem klicken von 2 karten
  tries++;
  anzahlVersucheElement.textContent = `${tries}`;

  // ueberpruefen ob match
  checkForMatch();
}
// ------ Funktion Ende ------




// zu beginn keine matches
let matchesFound = 0;

// ------ Funktion, die checkt, ob die 2 zwischengespeicherten karten matchen:
function checkForMatch() {
  // pruefen ob die summe der ersten und der 2 karte 17 ergibt, wahr/false als bool speichern
  const isFirstMatch = Number(firstCard.dataset.value) + Number(secondCard.dataset.value) === 17;

  // if match = wahr
  if (isFirstMatch) {
    disableCards();
    // Display memoryBgI.png for matched cards and disable clicking
    firstCard.style.backgroundImage = `url('./pics/memoryBgI.png')`;
    secondCard.style.backgroundImage = `url('./pics/memoryBgI.png')`;
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    matchesFound++;

  // if match = false, call fkt unflipCards, wo das blaue bild wieder gesetzt wird
  } else {
    unflipCards();
  }

  resetCards();
}
// ------ Funktion Ende ------



// ------ Funktion, die die matching cards auf das graue bild setzt, removes clickability and adds class = matched
function disableCards() {
  firstCard.style.backgroundImage = "url('./pics/memoryBgI.png')";
  secondCard.style.backgroundImage = "url('./pics/memoryBgI.png')";
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  // Count the number of matched cards, wenn matched cards schon soviel sind wie es karten gibt = spiel ende = zeit counter stoppen
  const matchedCards = document.querySelectorAll('.matched');
  if (matchedCards.length === cardElements.length) {
    clearInterval(intervalId);
  }
}
// ------ Funktion Ende ------


function unflipCards() {
  setTimeout(() => {
    cardElements.forEach((card) => {
      if (card !== firstCard && card !== secondCard && !card.classList.contains('matched')) {
        card.style.backgroundImage = "url('./pics/memoryBg.png')";
        card.classList.remove('flip');
      }
    });
    resetCards();
  }, 1000);
}


function resetCards() {
  [firstCard, secondCard] = [null, null];
}


