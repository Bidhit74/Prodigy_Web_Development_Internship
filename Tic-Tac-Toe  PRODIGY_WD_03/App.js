const boxes = document.querySelectorAll(".game-box");
const gameInfo = document.querySelector(".won-text");
const newGameHBtn = document.querySelector(".result-box");
const gameContent = document.querySelector(".game-content");
const selectBox = document.querySelector(".selectBox");
const PlayerX = document.querySelector(".PlayerX");
const PlayerO = document.querySelector(".PlayerO");
const playersTurn = document.querySelector(".playersTurn");
const slider = document.querySelector(".slider");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function initGame() {
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // winner color removed
        box.classList.remove("winner");
    });
    newGameHBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    gameContent.classList.add("active");
    gameInfo.classList.add("active");
}

function swapTrun() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
        slider.classList.add("rightAnime");
        slider.classList.remove("leftAnime");
    } else {
        currentPlayer = "X";
        slider.classList.add("leftAnime");
        slider.classList.remove("rightAnime");
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

PlayerX.addEventListener("click", () => {
    currentPlayer = "X";
    initGame();
    selectBox.style.display = "none";
    gameInfo.classList.remove("active");
    playersTurn.classList.add("active");
    slider.classList.add("leftAnime");
    slider.classList.remove("rightAnime");
});
PlayerO.addEventListener("click", () => {
    currentPlayer = "O";
    initGame();
    selectBox.style.display = "none";
    gameInfo.classList.remove("active");
    playersTurn.classList.add("active");
    slider.classList.add("rightAnime");
    slider.classList.remove("leftAnime");
});

function checkGameOver() {
    let ans = "";
    winningPosition.forEach((position) => {
        if (
            (gameGrid[position[0]] !== "" ||
                gameGrid[position[1]] !== "" ||
                gameGrid[position[2]] !== "") &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
        ) {
            if (gameGrid[position[0]] === "X") {
                ans = "X";
            } else {
                ans = "O";
            }

            boxes.forEach((box, index) => {
                boxes[index].style.pointerEvents = "none";
            });
            boxes[position[0]].classList.add("winner");
            boxes[position[1]].classList.add("winner");
            boxes[position[2]].classList.add("winner");
        }
    });

    // Game Winnig ke baad
    if (ans !== "") {
        gameInfo.innerText = `Winner Player ${ans}`;
        newGameHBtn.classList.add("active");
        gameContent.classList.remove("active");
        return;
    }
    // Game is Tie
    let fillBox = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillBox++;
        }
    });
    if (fillBox === 9) {
        gameInfo.innerText = `Game Tie`;
        newGameHBtn.classList.add("active");
        gameContent.classList.remove("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTrun();
        checkGameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameHBtn.addEventListener("click", initGame);
