let cardElements = document.getElementsByClassName('game-card');
let cardElementsArray = [...cardElements];
let imgElements = document.getElementsByClassName('game-card-img');
let imgElementsArray = [...imgElements];
let starElements = document.getElementsByClassName('star');
let starElementsArray = [...starElements];
let counter = document.getElementById('moveCounter');
let timer = document.getElementById('timer');
let modalElement = document.getElementById('gameOverModal');
let totalGameMovesElement = document.getElementById('totalGameMoves');
let totalGameTimeElement = document.getElementById('totalGameTime');
let finalStarRatingElement = document.getElementById('finalStarRating');
let closeModalIcon = document.getElementById('closeModal');
let openedCards = [];
let matchedCards =  [];
let moves;
let second = 0,
    minute = 0,
    hour = 0,
    interval,
    totalGameTime,
    starRating;

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !==0) {
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
    for(i=0; i<shuffledImages.length; i++) {
        cardElements[i].innerHTML = "";
        cardElements[i].appendChild(shuffledImages[i]);
        cardElements[i].type = `${shuffledImages[i].alt}`;
        cardElements[i].classList.remove("show", "open", "match", "disabled");
        cardElements[i].children[0].classList.remove("show-img");
    }
    for(let i = 0; i < cardElementsArray.length; i++) {
        cardElementsArray[i].addEventListener("click", displayCard)
    }
    moves = 0;
    clearInterval(interval);
}
function displayCard() {
    this.children[0].classList.toggle('show-img');
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    cardOpen(this);
}

function cardOpen(card) {
    openedCards.push(card);
    let len = openedCards.length;
    if(len === 2) {
        moveCounter();
        if(openedCards[0].type === openedCards[1].type) {
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
    if(matchedCards.length == 16) {
        alert("Congrats !! you have completed the came")
        location.reload()
    }
}

function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        openedCards[0].children[0].classList.remove('show-img');
        openedCards[1].children[0].classList.remove('show-img');
        enable();
        openedCards = [];
        
    }, 1100)
}

function disable() {
    cardElementsArray.filter((card, i, cardElementsArray) => {
        card.classList.add('disabled');
    })
}

function enable() {
    cardElementsArray.filter((card, i, cardElementsArray) => {
        card.classList.remove('disabled');
        for(let i=0; i<matchedCards.length; i++) {
            matchedCards[i].classList.add('disabled');
        }
    })
}

function moveCounter() {
    moves++;
    if(moves>10){
        alert("Game over Try Again");
        location.reload();
    }
}
window.onload = function () {
    setTimeout(function() {
        startGame()
    }, 1200);
}