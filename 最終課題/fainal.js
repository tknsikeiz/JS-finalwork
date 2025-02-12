"use strict";

const easyWords = [
    "apple", "banana", "cherry", "orange", "grape", 
    "melon", "kiwi", "lemon", "peach"
];

const normalWords = [
    "keyboard", "monitor", "mouse", "window", "button", 
    "screen", "system", "program", "software", "hardware", 
    "computer", "network", "server", "database", "internet"
];

const hardWords = [
    "refrigerator", "telecommunication", "microprocessor", "quantum", "artificial", 
    "technology", "electromagnetic", "biotechnology", "astronaut", "philosopher", 
    "mathematician", "philanthropy", "psychology", "economics", "microbiology"
];

        
let words = [];
let currentWord;
let gameTime = 0;
let gameInterval;
let wordIndex = 0;
let mistakes = 0;
let isPaused = false;

let userInput = document.getElementById("userInput");
let gameTimer = document.getElementById("gameTimer");
let easyBtn = document.getElementById("easyBtn");
let normalBtn = document.getElementById("normalBtn");
let hardBtn = document.getElementById("hardBtn");
let pauseButton = document.getElementById("pauseButton");
let resumeButton = document.getElementById("resumeButton");
let topButton = document.getElementById("topButton");
let mistakesCountDisplay = document.getElementById("mistakesCount");
let difficultyScreen = document.getElementById("difficultyScreen");
let gameScreen = document.getElementById("gameScreen");
let resultScreen = document.getElementById("resultScreen");
let finalTimeDisplay = document.getElementById("finalTime");
let finalMistakesDisplay = document.getElementById("finalMistakes");
let rankDisplay = document.getElementById("rankDisplay");
let retryButton = document.getElementById("retryButton");
let exitButton = document.getElementById("exitButton");
let pauseModal = document.getElementById("pauseModal");

easyBtn.addEventListener("click", function() {
    startGame("easy");
});
normalBtn.addEventListener("click", function() {
    startGame("normal");
});
hardBtn.addEventListener("click", function() {
    startGame("hard");
});

function startGame(difficulty) {
    difficultyScreen.style.display = "none";
    gameScreen.style.display = "block";
    userInput.disabled = false;
    mistakes = 0;
    wordIndex = 0;
    gameTime = 0;
    isPaused = false;
    mistakesCountDisplay.textContent = mistakes;
    userInput.value = "";
    selectDifficulty(difficulty);
    displayWord();
    startTimer();
}

function selectDifficulty(difficulty) {
    if (difficulty === "easy") {
        words = easyWords;
    } else if (difficulty === "normal") {
        words = normalWords;
    } else {
        words = hardWords;
    }
}

function startTimer() {
    gameInterval = setInterval(function() {
        if (!isPaused) {
            gameTime++;
            const minutes = Math.floor(gameTime / 60);
            const seconds = gameTime % 60;
            gameTimer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
    }, 1000);
}

function displayWord() {
    if (wordIndex < words.length) {
        currentWord = words[wordIndex];
        document.getElementById("wordToType").textContent = currentWord;
    } else {
        clearInterval(gameInterval);
        showResults();
    }
}

function checkInput(event) {
if (event.key === "Backspace") {
    return;
}

if (userInput.value === currentWord) {
    wordIndex++;
    userInput.value = "";
    displayWord();
} else if (userInput.value !== currentWord.substring(0, userInput.value.length)) {
    mistakes++;
    mistakesCountDisplay.textContent = mistakes;
}
}

function calculateRank() {
    let rank = "";
    let timeLimit = gameTime / 60; 
    if (timeLimit < 1.5 && mistakes <= 1) {
        rank = "S";
    } else if (timeLimit < 2.5 && mistakes <= 3) {
        rank = "A";
    } else if (timeLimit < 4 && mistakes <= 5) {
        rank = "B";
    } else if (timeLimit < 5 && mistakes <= 7) {
        rank = "C";
    } else {
        rank = "D";
    }
    return rank;
}

function showResults() {
    resultScreen.style.display = "block";
    gameScreen.style.display = "none";
    finalTimeDisplay.textContent = gameTimer.textContent;
    finalMistakesDisplay.textContent = mistakes;
    rankDisplay.textContent = calculateRank(); 
}

retryButton.addEventListener("click", function() {
    resultScreen.style.display = "none";
    difficultyScreen.style.display = "block";
});

exitButton.addEventListener("click", function() {
    window.close(); 
});

pauseButton.addEventListener("click", function() {
    isPaused = true;
    pauseModal.style.display = "flex"; 
});

resumeButton.addEventListener("click", function() {
    isPaused = false;
    pauseModal.style.display = "none";
});

topButton.addEventListener("click", function() {
    window.location.reload(); 
});

userInput.addEventListener("input", checkInput);