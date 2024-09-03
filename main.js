let cardElements = document.getElementsByClassName('game-card');
let cardElementsArray = [...cardElements];
let imgElements = document.getElementsByClassName('game-card-img');
let imgElementsArray = [...imgElements];
let counter = document.getElementById('moveCounter');
let timerElement = document.getElementById('timer');
let openedCards = [];
let matchedCards = [];
let moves = 0;
let timeElapsed = 0;
let timerInterval = null;

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {
    let shuffledImages = shuffle(imgElementsArray);
    for (let i = 0; i < shuffledImages.length; i++) {
        cardElements[i].innerHTML = "";
        cardElements[i].appendChild(shuffledImages[i]);
        cardElements[i].type = `${shuffledImages[i].alt}`;
        cardElements[i].classList.remove("show", "open", "match", "disabled");
        cardElements[i].children[0].classList.remove("show-img");
    }
    moves = 0;
    counter.textContent = moves;
    stopTimer();  // Reset the timer when the game starts
    timeElapsed = 0;
    timerElement.textContent = timeElapsed;
    for (let i = 0; i < cardElementsArray.length; i++) {
        cardElementsArray[i].addEventListener("click", displayCard);
    }
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(function () {
            timeElapsed++;
            timerElement.textContent = timeElapsed;
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function displayCard() {
    startTimer();  // Start the timer when the first card is clicked
    this.children[0].classList.toggle('show-img');
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    cardOpen(this);
}

function cardOpen(card) {
    openedCards.push(card);
    let len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    openedCards = [];
    if (matchedCards.length == 16) {
        alert("Congrats !! You have completed the game");
        location.reload();
    }
}

function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        openedCards[0].children[0].classList.remove('show-img');
        openedCards[1].children[0].classList.remove('show-img');
        enable();
        openedCards = [];
    }, 1100);
}

function disable() {
    cardElementsArray.filter((card) => {
        card.classList.add('disabled');
    });
}

function enable() {
    cardElementsArray.filter((card) => {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add('disabled');
        }
    });
}

function moveCounter() {
    moves++;
    counter.textContent = moves;
    if (moves >= 10) {
        setTimeout(() => {
            alert("Game over! Try Again.");
            stopTimer();
            location.reload();
        }, 200);
    }
}

window.onload = function () {
    setTimeout(function () {
        startGame();
    }, 1200);
};
