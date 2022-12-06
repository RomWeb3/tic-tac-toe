// Pick player

const pickX = document.querySelector(".pick-x");
const pickO = document.querySelector(".pick-o");
const selectX = document.querySelector(".select-x");
const selectO = document.querySelector(".select-o");
const newGameCpuBtn = document.querySelector(".cpu");

pickX.addEventListener("click", () => {
  pickX.classList.add("active");
  selectX.classList.add("active");
  pickO.classList.remove("active");
  selectO.classList.remove("active");
});

pickO.addEventListener("click", () => {
  pickO.classList.add("active");
  selectO.classList.add("active");
  pickX.classList.remove("active");
  selectX.classList.remove("active");
});

// Start game

const playVsCpu = document.querySelector(".cpu");
const playVsPlayer = document.querySelector(".player");
const menu = document.querySelector(".new-game-menu");
const game = document.querySelector(".game");
const scoreX = document.querySelector(".x-picked");
const scoreO = document.querySelector(".o-picked");
const newGameMenu = document.querySelector(".new-game-menu");
let currentPlayer;
let xOrO; // Player pick X or O
let oOrX; // CPU pick X or O

playVsCpu.addEventListener("click", () => {
  menu.classList.remove("active");
  game.classList.add("active", "cpu");
  if (pickX.classList.contains("active")) {
    game.classList.add("pickX");
    cells.forEach((cell) => {
      cell.classList.add("X-picked");
    });
    currentPlayer = "X";
    xOrO = "x";
    oOrX = "o";
    scoreX.innerText = "X (You)";
    scoreO.innerText = "O (CPU)";
  } else {
    game.classList.add("pickO");
    cells.forEach((cell) => {
      cell.classList.add("O-picked");
    });
    currentPlayer = "O";
    xOrO = "o";
    oOrX = "x";
    scoreX.innerText = "X (CPU)";
    scoreO.innerText = "O (You)";
    setTimeout(cpuFirstMove, 500);
  }
});

playVsPlayer.addEventListener("click", () => {
  menu.classList.remove("active");
  game.classList.add("active");
  game.classList.add("player");
  if (pickX.classList.contains("active")) {
    game.classList.add("pickX");
    newGameMenu.classList.add("pickX");
    cells.forEach((cell) => {
      cell.classList.add("X-picked");
    });
    currentPlayer = "X";
    xOrO = "x";
    oOrX = "o";
    scoreX.innerText = "X (P1)";
    scoreO.innerText = "O (P2)";
  } else {
    game.classList.add("pickO");
    newGameMenu.classList.add("pickO");
    cells.forEach((cell) => {
      cell.classList.add("O-picked");
    });
    currentPlayer = "O";
    xOrO = "o";
    oOrX = "x";
    scoreX.innerText = "X (P2)";
    scoreO.innerText = "O (P1)";
  }
});

// Game Solo - Easy mode
const cell1 = document.querySelector("#cell-1");
const cell2 = document.querySelector("#cell-2");
const cell3 = document.querySelector("#cell-3");
const cell4 = document.querySelector("#cell-4");
const cell5 = document.querySelector("#cell-5");
const cell6 = document.querySelector("#cell-6");
const cell7 = document.querySelector("#cell-7");
const cell8 = document.querySelector("#cell-8");
const cell9 = document.querySelector("#cell-9");
const cells = document.querySelectorAll(".cell");
let moveCounter = 0;
const modal = document.querySelector(".modal");
const winOrLoseTxt = document.querySelector(".win-or-lose-txt");
const drawModal = document.querySelector(".modal-draw");
let gameActive = true;

// Player click and play - cpu play after player
function player() {
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (
        cell.childElementCount !== 0 ||
        gameActive === false ||
        game.classList.contains("cpu") === false ||
        (game.classList.contains("pickX") && currentPlayer === "O") ||
        (game.classList.contains("pickO") && currentPlayer === "X")
      ) {
        return;
      } else if (
        cell.childElementCount === 0 &&
        game.classList.contains("pickX")
      ) {
        const img = document.createElement("img");
        img.src = "./assets/icon-x.svg";
        cell.append(img);
        switchTurn("O");
        currentPlayer = "O";
        cell.classList.add("played");
      } else if (
        cell.childElementCount === 0 &&
        game.classList.contains("pickO")
      ) {
        const img = document.createElement("img");
        img.src = "./assets/icon-o.svg";
        cell.append(img);
        switchTurn("X");
        currentPlayer = "X";
        cell.classList.add("played");
      }
      setTimeout(cpu, 500);
      moveCounter++;
      result("player");
    });
  });
}

// CPU play on random cell and retry if cell is already taken
function cpu() {
  const random = Math.floor(Math.random() * 9) + 1;
  const cell = document.querySelector(`#cell-${random}`);

  if (moveCounter < 9 && gameActive === true) {
    if (cell.childElementCount !== 0) {
      return cpu();
    } else if (
      cell.childElementCount === 0 &&
      game.classList.contains("pickX")
    ) {
      const img = document.createElement("img");
      img.src = "./assets/icon-o.svg";
      cell.append(img);
      moveCounter++;
      switchTurn("X");
      currentPlayer = "X";
      cell.classList.add("played");
      result("cpu");
    } else if (
      cell.childElementCount === 0 &&
      game.classList.contains("pickO")
    ) {
      const img = document.createElement("img");
      img.src = "./assets/icon-x.svg";
      cell.append(img);
      moveCounter++;
      switchTurn("O");
      currentPlayer = "O";
      cell.classList.add("played");
      result("cpu");
    }
  }
}

// CPU first move if player pick O
function cpuFirstMove() {
  const random = Math.floor(Math.random() * 9) + 1;
  const cell = document.querySelector(`#cell-${random}`);

  if (moveCounter < 1 && game.classList.contains("cpu")) {
    const img = document.createElement("img");
    img.src = "./assets/icon-x.svg";
    cell.append(img);
    moveCounter++;
    switchTurn("O");
  }
}

// Make the result & add class to winner cells & Display modal
function result(winner) {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = cells[winCondition[0]];
    const b = cells[winCondition[1]];
    const c = cells[winCondition[2]];
    const aChild = a.firstElementChild;
    const bChild = b.firstElementChild;
    const cChild = c.firstElementChild;

    if (aChild !== null && bChild !== null && cChild !== null) {
      if (aChild.src === bChild.src && bChild.src === cChild.src) {
        roundWon = true;
        gameActive = false;
        if (aChild.src.includes("icon-x")) {
          aChild.parentElement.classList.add("winX");
          bChild.parentElement.classList.add("winX");
          cChild.parentElement.classList.add("winX");
          updateScoreboard("x");
        } else if (aChild.src.includes("icon-o")) {
          aChild.parentElement.classList.add("winO");
          bChild.parentElement.classList.add("winO");
          cChild.parentElement.classList.add("winO");
          updateScoreboard("o");
        }
        break;
      }
    }
  }

  if (roundWon && winner === "player" && game.classList.contains("cpu")) {
    setTimeout(() => {
      winOrLoseTxt.innerText = "you won!";
      modal.classList.add("active", xOrO);
    }, 700);
  } else if (roundWon && winner === "cpu" && game.classList.contains("cpu")) {
    setTimeout(() => {
      winOrLoseTxt.innerText = "oh no, you lost...";
      modal.classList.add("active", oOrX);
    }, 700);
  } else if (
    roundWon &&
    winner === "player" &&
    newGameMenu.classList.contains("pickX")
  ) {
    setTimeout(() => {
      winOrLoseTxt.innerText = "player 1 wins!";
      modal.classList.add("active", xOrO);
    }, 700);
  } else if (
    roundWon &&
    winner === "cpu" &&
    newGameMenu.classList.contains("pickX")
  ) {
    setTimeout(() => {
      winOrLoseTxt.innerText = "player 2 wins!";
      modal.classList.add("active", oOrX);
    }, 700);
  } else if (
    roundWon &&
    winner === "cpu" &&
    newGameMenu.classList.contains("pickO")
  ) {
    setTimeout(() => {
      winOrLoseTxt.innerText = "player 1 wins!";
      modal.classList.add("active", xOrO);
    }, 700);
  } else if (
    roundWon &&
    winner === "player" &&
    newGameMenu.classList.contains("pickO")
  ) {
    setTimeout(() => {
      winOrLoseTxt.innerText = "player 2 wins!";
      modal.classList.add("active", oOrX);
    }, 700);
  } else if (moveCounter === 9) {
    setTimeout(() => {
      updateScoreboard("draw");
      drawModal.classList.add("active");
    }, 700);
  }
}

const xScore = document.getElementById("your-score");
const oScore = document.getElementById("cpu-score");
const tiesScore = document.getElementById("ties-score");

function updateScoreboard(winner) {
  if (winner === "x") {
    xScore.innerText = parseInt(xScore.innerText) + 1;
  } else if (winner === "o") {
    oScore.innerText = parseInt(oScore.innerText) + 1;
  } else if (winner === "draw") {
    tiesScore.innerText = parseInt(tiesScore.innerText) + 1;
  }
}

function restart() {
  const restartBtn = document.querySelector(".restart");
  const restartModal = document.querySelector(".modal-restart-game");
  const cancelBtn = document.querySelector("#cancel");
  const confirmBtn = document.querySelector("#restart");

  restartBtn.addEventListener("click", () => {
    restartModal.classList.add("active");
  });
  cancelBtn.addEventListener("click", () => {
    restartModal.classList.remove("active");
  });
  confirmBtn.addEventListener("click", () => {
    cells.forEach((cell) => {
      cell.innerHTML = "";
      moveCounter = 0;
      switchTurn("X");
      gameActive = true;
      cell.classList.remove("played", "winX", "winO");
    });
    restartModal.classList.remove("active");
    if (game.classList.contains("pickO")) {
      setTimeout(cpuFirstMove, 500);
    }
    if (newGameMenu.classList.contains("pickX")) {
      game.classList.remove("pickO");
      game.classList.add("pickX");
      currentPlayer = "X";
      cells.forEach((cell) => {
        cell.classList.remove("O-picked");
        cell.classList.add("X-picked");
      });
    } else if (newGameMenu.classList.contains("pickO")) {
      game.classList.remove("pickX");
      game.classList.add("pickO");
      currentPlayer = "O";
      cells.forEach((cell) => {
        cell.classList.remove("X-picked");
        cell.classList.add("O-picked");
      });
    }
  });
}

function nextRound() {
  const nextRoundBtn = document.querySelectorAll(".next-round");

  nextRoundBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("played", "winX", "winO");
      });
      moveCounter = 0;
      modal.classList.remove("active", "x", "o");
      gameActive = true;
      currentPlayer = game.classList.contains("pickX") ? "X" : "O";
      drawModal.classList.remove("active");
      if (game.classList.contains("pickO")) {
        setTimeout(cpuFirstMove, 500);
      }
      if (newGameMenu.classList.contains("pickX")) {
        game.classList.remove("pickO");
        game.classList.add("pickX");
        currentPlayer = "X";
        cells.forEach((cell) => {
          cell.classList.remove("O-picked");
          cell.classList.add("X-picked");
        });
      } else if (newGameMenu.classList.contains("pickO")) {
        game.classList.remove("pickX");
        game.classList.add("pickO");
        currentPlayer = "O";
        cells.forEach((cell) => {
          cell.classList.remove("X-picked");
          cell.classList.add("O-picked");
        });
      }
    });
  });
}

function quit() {
  const quitBtn = document.querySelectorAll(".quit");

  quitBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      drawModal.classList.remove("active");
      menu.classList.add("active");
      game.classList.remove("active", "cpu", "pickX", "pickO");
      modal.classList.remove("active", "x", "o");
      xScore.innerText = 0;
      oScore.innerText = 0;
      tiesScore.innerText = 0;
      cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("played", "X-picked", "O-picked", "winX", "winO");
        moveCounter = 0;
        gameActive = true;
      });
    });
  });
}

function switchTurn(currentPlayer) {
  const xTurn = document.querySelector(".x-turn");
  const oTurn = document.querySelector(".o-turn");
  if (currentPlayer === "X") {
    xTurn.classList.add("active");
    oTurn.classList.remove("active");
  } else if (currentPlayer === "O") {
    oTurn.classList.add("active");
    xTurn.classList.remove("active");
  }
}

function newGame() {
  player();
  result();
  restart();
  nextRound();
  quit();
}

newGame();

// Player vs Player

function playerVsPlayer() {
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (
        cell.childElementCount !== 0 ||
        gameActive === false ||
        game.classList.contains("player") === false ||
        (game.classList.contains("pickX") && currentPlayer === "O") ||
        (game.classList.contains("pickO") && currentPlayer === "X")
      ) {
        return;
      } else if (
        cell.childElementCount === 0 &&
        game.classList.contains("pickX")
      ) {
        const img = document.createElement("img");
        img.src = "./assets/icon-x.svg";
        cell.append(img);
        switchTurn("O");
        currentPlayer = "O";
        cell.classList.add("played");
        cells.forEach((cell) => {
          cell.classList.remove("X-picked");
          cell.classList.add("O-picked");
        });
        game.classList.remove("pickX");
        game.classList.add("pickO");
        moveCounter++;
        result("player");
      } else if (
        cell.childElementCount === 0 &&
        game.classList.contains("pickO")
      ) {
        const img = document.createElement("img");
        img.src = "./assets/icon-o.svg";
        cell.append(img);
        switchTurn("X");
        currentPlayer = "X";
        cell.classList.add("played");
        cells.forEach((cell) => {
          cell.classList.remove("O-picked");
          cell.classList.add("X-picked");
        });
        game.classList.remove("pickO");
        game.classList.add("pickX");
        moveCounter++;
        result("cpu");
      }
    });
  });
}

playerVsPlayer();
