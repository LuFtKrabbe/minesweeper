import { createMenu } from './menu.js';
import { createInfo } from './info.js';
import { createField } from './field.js';
import { setGameField } from './mines.js';
import { openCell, changeCellState } from './cells.js';
import { showFlags } from './mines-and-flags.js';
import { showMines } from './mines-and-flags.js';
import { countMines } from './mines-and-flags.js';
import { displayMinesAndFlags } from './mines-and-flags.js';
import { displayRecords } from './records.js';
import { writeRecord } from './records.js';
import { launchTimer } from './timer.js';
import { stopTimer } from './timer.js';

let fieldSize = Number(localStorage.getItem('field')) ?? 10;
let minesQuantity = Number(localStorage.getItem('mines')) ?? 10;

let firstClick = true;
let mineBursted = false;

function setLocalStorage() {
  localStorage.setItem('field', fieldSize);
  localStorage.setItem('mines', minesQuantity);
}

window.addEventListener('beforeunload', setLocalStorage);

createMenu(minesQuantity, fieldSize);
createInfo();
createField(fieldSize);
displayRecords();

const rightClickStates = ['cell', 'cell flag', 'cell question'];
const mineValue = document.querySelector('.mine-value');
const flagValue = document.querySelector('.flag-value');
const stepValue = document.querySelector('.step-value');
const timeValue = document.querySelector('.time-value');
const modeBlock = document.querySelector('.mode-block');
const newGameBlock = document.querySelector('.new-game-block');

const mineSetInput = document.querySelector('.mine-set-input');
const message = document.querySelector('.message');

message.innerText = 'Choose the field size and set the mine quantity';

function setMode(event) {
  document.querySelector('.mode-easy').classList.remove('mode-active');
  document.querySelector('.mode-medium').classList.remove('mode-active');
  document.querySelector('.mode-hard').classList.remove('mode-active');

  if (event.target.matches('.mode-easy')) { fieldSize = 10; }
  if (event.target.matches('.mode-medium')) { fieldSize = 15; }
  if (event.target.matches('.mode-hard')) { fieldSize = 25; }

  if (firstClick === true) { createField(fieldSize); }

  event.target.classList.add('mode-active');
}

function startGame(clickedCell) {
  setGameField(clickedCell);
  displayMinesAndFlags();
  launchTimer();
  message.innerText = 'Find all mines!';
  firstClick = false;
}

function finishGameWin() {
  showFlags()
  message.innerText = `Hooray! You found all mines in \n${timeValue.innerText} second(s) and ${stepValue.innerText} move(s)!`;
  writeRecord();
  stopTimer();
  const playWin = new Audio('./assets/sounds/game-win.mp3');
  playWin.play();
}

function finishGameDefeat() {
  const playDefeat = new Audio('./assets/sounds/game-defeat.mp3');
  playDefeat.play();
  message.innerText = 'Game over. Try again!';
  mineBursted = true;
  showMines();
  stopTimer();
}

function prepareNewGame() {
  stopTimer();
  createField(fieldSize);
  displayMinesAndFlags();
  message.innerText = 'Choose the field size and set the mine quantity';
  mineValue.innerText = 0;
  flagValue.innerText = 0;
  timeValue.innerText = 0;
  stepValue.innerText = 0;
  firstClick = true;
  mineBursted = false;
}

function isWin() {
  const cells = document.querySelectorAll('.cell');
  let allCells = 0;
  let openedCells = 0;
  cells.forEach((cell) => {
    if (cell.matches('.opened')) { openedCells += 1; }
    allCells += 1;
  });
  if ((allCells - openedCells) === countMines() && !mineBursted) { return true; }
  return false;
}

function isDefeat() {
  return mineBursted;
}

modeBlock.addEventListener('click', setMode);
newGameBlock.addEventListener('click', prepareNewGame);

addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.textContent === '*') { finishGameDefeat(); }
  if (isWin() || isDefeat()) { event.stopImmediatePropagation(); }
  if (event.target.className === 'cell') {
    if (firstClick) { startGame(event.target.attributes.num.value); }
    openCell(event.target);
    stepValue.innerText = Number(stepValue.innerText) + 1;
    if (isWin()) { 
      finishGameWin(); 
    } else {
      const playClick = new Audio('./assets/sounds/click-cell.mp3');
      playClick.play();
    }
  }
});

addEventListener('contextmenu', (event) => {
  event.preventDefault();
  if (isWin() || isDefeat()) { event.stopImmediatePropagation(); }
  if (rightClickStates.includes(event.target.className)) {
    changeCellState(event.target);
    displayMinesAndFlags();
  }
});

addEventListener('mousedown', (event) => {
  //event.preventDefault();
});

mineSetInput.addEventListener('input', (event) => {
  minesQuantity = Number(event.target.value);
  document.querySelector('.mine-set-label').innerText = `MINES QUANTITY: ${minesQuantity}`;
});
