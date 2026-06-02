import './style.css';
import Player from './modules/player.js';
import { renderBoard } from './modules/dom.js';

import confetti from 'canvas-confetti';

import hitSoundFile from './assets/sounds/hit.mp3';
import sunkSoundFile from './assets/sounds/hit.mp3';
import winSoundFile from './assets/sounds/win.mp3';
import loseSoundFile from './assets/sounds/lose.mp3';
import bgMusicFile from './assets/sounds/bgm.mp3';

const bgMusic = new Audio(bgMusicFile);

bgMusic.loop = true;
bgMusic.volume = 0.3;

const human = new Player();

const computer = new Player('computer');

let currentTurn = 'player';

let gameOver = false;

let difficulty = "easy";

const hitSound = new Audio(hitSoundFile);

const sunkSound = new Audio(sunkSoundFile);

const winSound = new Audio(winSoundFile);

const loseSound = new Audio(loseSoundFile);


// UI HELPERS


function updateTurnMessage(message) {

    document.getElementById("turn-message").textContent = message;

}

function updateGameStatus(message) {

    document.getElementById("game-status").textContent = message;

}

function showWinner(winner) {

    const overlay =
        document.getElementById(
            "winner-overlay"
        );

    const winnerText =
        document.getElementById(
            "winner-text"
        );

    overlay.classList.remove("hidden");

    winnerText.textContent = winner;

    if (winner === "YOU WIN!") {

        winSound.play();

        confetti({
            particleCount: 250,
            spread: 180,
            origin: { y: 0.6 }
        });

    } else {

        loseSound.play();

    }
}

function fadeOutMenuMusic() {

  const fade = setInterval(() => {

    if (bgMusic.volume > 0.05) {

      bgMusic.volume -= 0.05;

    } else {

      bgMusic.pause();
      bgMusic.currentTime = 0;

      clearInterval(fade);

    }

  }, 100);

}

// START GAME

function startGame(level) {

    fadeOutMenuMusic();


    difficulty = level;

    hitSound.load();
    sunkSound.load();
    winSound.load();
    loseSound.load();

    document
        .getElementById("start-screen")
        .classList.add("hidden");

    document
        .getElementById("game-screen")
        .classList.remove("hidden");

    updateGameStatus(
        `Game started on ${level.toUpperCase()} mode`
    );

    updateTurnMessage("Your Turn");

    initializeGame();

    bgMusic.play().catch(() => {});
}

// INITIALIZE GAME

function initializeGame() {
  gameOver = false;

    human.gameboard.randomizeShips([
        5,
        4,
        3,
        3,
        2
    ]);

    computer.gameboard.randomizeShips([
        5,
        4,
        3,
        3,
        2
    ]);



    const humanBoardContainer =
        document.getElementById('player-board');

    const computerBoardContainer =
        document.getElementById('computer-board');



    // CLEAR BOARDS FIRST

    humanBoardContainer.innerHTML = '';

    computerBoardContainer.innerHTML = '';



    const humanBoard = document.createElement('div');

    const computerBoard = document.createElement('div');




    humanBoard.classList.add('board');

    computerBoard.classList.add('board');



    humanBoardContainer.appendChild(humanBoard);

    computerBoardContainer.appendChild(computerBoard);



    renderBoard(
        human.gameboard,
        humanBoard,
        null,
        false,
        gameOver,
        true
    );



    playerTurn(humanBoard, computerBoard);

}

// PLAYER TUrn

function playerTurn(humanBoard, computerBoard) {

    if (gameOver) return;

    currentTurn = 'player';

    updateTurnMessage("Your Turn");



    renderBoard(
        computer.gameboard,
        computerBoard,
        () => {

            if (checkWinner()) return;
            currentTurn = 'computer';
            updateTurnMessage("Computer Thinking...");

            computerTurn(humanBoard, computerBoard);
        },
      
        true,
        gameOver,
        false
    );

}


// COMPUTER TURN


function computerTurn(humanBoard, computerBoard) {

    if (gameOver) return;



    setTimeout(() => {

        if (difficulty === "easy") {

    computer.randomAttack(human.gameboard);

}

else if (difficulty === "medium") {

    computer.mediumAttack(human.gameboard);

}

else if (difficulty === "hard") {

    computer.hardAttack(human.gameboard);

}



        renderBoard(
            human.gameboard,
            humanBoard,
            null,
            false,
            gameOver,
            true
        );

        renderBoard(
            computer.gameboard,
            computerBoard,
            null,
            true,
            gameOver,
            false
        );

        

        if (checkWinner()) return;

        updateTurnMessage('Your turn!');


        playerTurn(humanBoard, computerBoard);

    }, 500);

}


// WIN CHECK

function checkWinner() {

    if (computer.gameboard.allShipsSunk()) {

        gameOver = true;

        updateGameStatus("You Win!");

        updateTurnMessage("Game Over");

        showWinner("YOU WIN!");

        return true;
    }



    if (human.gameboard.allShipsSunk()) {

        gameOver = true;

        updateGameStatus("Computer Wins!");

        updateTurnMessage("Game Over");

        showWinner("YOU LOSE!");

        return true;
    }



    return false;
}


// DIFFICULTY BUTTONS

document
    .getElementById("easy-btn")
    .addEventListener("click", () => {

        startGame("easy");

    });



document
    .getElementById("medium-btn")
    .addEventListener("click", () => {

        startGame("medium");

    });



document
    .getElementById("hard-btn")
    .addEventListener("click", () => {

        startGame("hard");

    });


// restart button

document
    .getElementById("restart-button")
    .addEventListener("click", () => {

        location.reload();

    });

// play again button

document
    .getElementById("play-again-btn")
    .addEventListener("click", () => {

        location.reload();

    });

document.addEventListener(
    "shipHit",
    () => {

        hitSound.currentTime = 0;

        hitSound.play();

    }
);

document.addEventListener(
    "shipSunk",
    () => {

        sunkSound.currentTime = 0;

        sunkSound.play();

    }
);

function startMenuMusic() {
    bgMusic.play().catch(() => {
        console.log("Music blocked until user interaction");
    });
}

document.addEventListener(
    "click", startMenuMusic, { once: true }
);



