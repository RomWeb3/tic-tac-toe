// Pick player

const pickX = document.querySelector('.pick-x');
const pickO = document.querySelector('.pick-o');
const selectX = document.querySelector('.select-x');
const selectO = document.querySelector('.select-o');
const newGameCpuBtn = document.querySelector('.cpu');

pickX.addEventListener('click', () => {
    pickX.classList.add('active');
    selectX.classList.add('active');
    pickO.classList.remove('active');
    selectO.classList.remove('active');
}); 

pickO.addEventListener('click', () => {
    pickO.classList.add('active');
    selectO.classList.add('active');
    pickX.classList.remove('active');
    selectX.classList.remove('active');
});

// Start game

const playVsCpu = document.querySelector('.cpu');
const playVsPlayer = document.querySelector('.player');
const menu = document.querySelector('.new-game-menu');
const game = document.querySelector('.game');
let currentPlayer;

playVsCpu.addEventListener('click', () => {
    menu.classList.remove('active');
    game.classList.add('active');
    game.classList.add('cpu');
    if (pickX.classList.contains('active')) {
        game.classList.add('pickX')
        currentPlayer = 'X';
    } else {
        game.classList.add('pickO')
        currentPlayer = 'O';
        setTimeout(cpuFirstMove, 500);
    }
});

playVsPlayer.addEventListener('click', () => {
    menu.classList.remove('active');
    game.classList.add('active');
    game.classList.add('player');
});

// Game Solo - Easy mode

const cell1 = document.querySelector('#cell-1');
const cell2 = document.querySelector('#cell-2');
const cell3 = document.querySelector('#cell-3');
const cell4 = document.querySelector('#cell-4');
const cell5 = document.querySelector('#cell-5');
const cell6 = document.querySelector('#cell-6');
const cell7 = document.querySelector('#cell-7');
const cell8 = document.querySelector('#cell-8');
const cell9 = document.querySelector('#cell-9');
const cells = document.querySelectorAll('.cell');
let moveCounter = 0;
const drawModal = document.querySelector('.modal-draw');
let gameActive = true;



function player() {
    cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (cell.childElementCount !== 0) {
                    return;
                } else if (cell.childElementCount === 0 && game.classList.contains('pickX')) {
                    const img = document.createElement('img');
                    img.src = "./assets/icon-x.svg";
                    cell.append(img);
                    switchTurn('O');
                } else if (cell.childElementCount === 0 && game.classList.contains('pickO')) {
                    const img = document.createElement('img');
                    img.src = "./assets/icon-o.svg";
                    cell.append(img);
                    switchTurn('X');
                }
                setTimeout(cpu, 500);
                moveCounter++;
        })          
        }
    
)}

function cpu() {
    const random = Math.floor(Math.random() * 9) + 1;
    const cell = document.querySelector(`#cell-${random}`);
    
    if (moveCounter < 9) {
        if (cell.childElementCount !== 0) {
            return cpu();
        } else if (cell.childElementCount === 0 && game.classList.contains('pickX')) {
            const img = document.createElement('img');
            img.src = "./assets/icon-o.svg";
            cell.append(img);
            moveCounter++;
            switchTurn('X');
        } else if (cell.childElementCount === 0 && game.classList.contains('pickO')) {
            const img = document.createElement('img');
            img.src = "./assets/icon-x.svg";
            cell.append(img);
            moveCounter++;
            switchTurn('O');
        } 
    }
}

function cpuFirstMove() {
    const random = Math.floor(Math.random() * 9) + 1;
    const cell = document.querySelector(`#cell-${random}`);

    if (moveCounter < 1) {
        const img = document.createElement('img');
        img.src = "./assets/icon-x.svg";
        cell.append(img);
        moveCounter++;
        switchTurn('O');
    }
}



function restart() {
    const restartBtn = document.querySelector('.restart');
    const restartModal = document.querySelector('.modal-restart-game');
    const cancelBtn = document.querySelector('#cancel');
    const confirmBtn = document.querySelector('#restart');
    
    restartBtn.addEventListener('click', () => {
        restartModal.classList.add('active');
    })
    cancelBtn.addEventListener('click', () => {
        restartModal.classList.remove('active');
    })
    confirmBtn.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.innerHTML = '';
            moveCounter = 0;
            switchTurn('X');
        })
        restartModal.classList.remove('active');
        if (game.classList.contains('pickO')) {
            setTimeout(cpuFirstMove, 500);
        }
    }) 
}

function nextRound() {
    const nextRoundBtn = document.querySelectorAll('.next-round');

    nextRoundBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            cells.forEach(cell => {
                cell.innerHTML = '';
                moveCounter = 0;
            })
            drawModal.classList.remove('active');
            if (game.classList.contains('pickO')) {
                setTimeout(cpuFirstMove, 500);
            }
        })
    })
}

function quit() {
    const quitBtn = document.querySelectorAll('.quit');

    quitBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            drawModal.classList.remove('active');
            menu.classList.add('active');
            game.classList.remove('active');
            game.classList.remove('cpu');
            game.classList.remove('pickX');
            game.classList.remove('pickO');
            cells.forEach(cell => {
                cell.innerHTML = '';
                moveCounter = 0;
            })
        })
    })
}

function switchTurn(currentPlayer) {
    const xTurn = document.querySelector('.x-turn');
    const oTurn = document.querySelector('.o-turn');
    if (currentPlayer === 'X') {
        xTurn.classList.add('active');
        oTurn.classList.remove('active');
    } else if (currentPlayer === 'O') {
        oTurn.classList.add('active');
        xTurn.classList.remove('active');
    }
}



function newGame() {
    player();
    restart();
    nextRound();
    quit();
}

newGame();




