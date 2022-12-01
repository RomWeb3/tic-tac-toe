// Pick player

const pickX = document.querySelector('.pick-x');
const pickO = document.querySelector('.pick-o');
const x = document.querySelector('.x');
const o = document.querySelector('.o');

pickX.addEventListener('click', () => {
    pickX.classList.add('active');
    x.classList.add('active');
    pickO.classList.remove('active');
    o.classList.remove('active');
}); 

pickO.addEventListener('click', () => {
    pickO.classList.add('active');
    o.classList.add('active');
    pickX.classList.remove('active');
    x.classList.remove('active');
});

// Start game

const playVsCpu = document.querySelector('.cpu');
const playVsPlayer = document.querySelector('.player');
const menu = document.querySelector('.new-game-menu');
const game = document.querySelector('.game');

playVsCpu.addEventListener('click', () => {
    menu.classList.remove('active');
    game.classList.add('active');
    game.classList.add('cpu');
});

playVsPlayer.addEventListener('click', () => {
    menu.classList.remove('active');
    game.classList.add('active');
    game.classList.add('player');
});

// Game Solo - Easy mode



