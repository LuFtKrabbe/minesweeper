import { createMenu, toggleColor, toggleSound } from './menu.js';
import { createInfo } from './info.js';
import { createField } from './field.js';
import { setGameField } from './mines.js';
import { openCell, changeCellState, addStep } from './cells.js';
import { countMines, showMines, showFlags } from './stats.js';
import { clearStats, showMessage, displayMinesAndFlags } from './stats.js';
import { displayRecords, writeRecord } from './records.js';
import { launchTimer, stopTimer } from './timer.js';
import { playSound } from "./sounds";

let fieldSize = Number(localStorage.getItem('field')) || 10;
let minesQuantity = Number(localStorage.getItem('mines')) || 10;
let savedCells = JSON.parse(localStorage.getItem('cells'));

let firstClick = true;
let mineBursted = false;

createMenu(minesQuantity, fieldSize);
createInfo();
createField(fieldSize);
displayRecords();
loadGame();

const modeBlock = document.querySelector('.mode-block');
const newGameBlock = document.querySelector('.new-game-block');
const mineSetInput = document.querySelector('.mine-set-input');

function saveGame() {
  if (!firstClick) {
    const cells = document.querySelectorAll('.cell');
    const time = document.querySelector('.time-value');
    const step = document.querySelector('.step-value');
    const message = document.querySelector('.message');
    const sound = document.querySelector('.sound-block');
    const color = document.querySelector('.color-block');
  
    savedCells = []; 
    cells.forEach((cell) => {savedCells.push([cell.className, cell.textContent]);})

    localStorage.setItem('mineBursted', mineBursted);
    localStorage.setItem('soundClass', sound.className);
    localStorage.setItem('soundText', sound.innerText);
    localStorage.setItem('colorClass', color.className);
    localStorage.setItem('colorText', color.innerText);
    localStorage.setItem('step', step.innerText);
    localStorage.setItem('time', time.innerText);
    localStorage.setItem('message', message.innerText);
    localStorage.setItem('cells', JSON.stringify(savedCells));
  }
  localStorage.setItem('field', fieldSize);
  localStorage.setItem('mines', minesQuantity);
}

function loadGame() {
  if (savedCells) {
    const cells = document.querySelectorAll('.cell');
    const time = document.querySelector('.time-value');
    const step = document.querySelector('.step-value');
    const message = document.querySelector('.message');
    const sound = document.querySelector('.sound-block');
    const color = document.querySelector('.color-block');

    cells.forEach((cell, key) => {
      cell.className = savedCells[key][0];
      cell.textContent = savedCells[key][1];
    })
  
    sound.className = localStorage.getItem('soundClass') || 'sound-block';
    sound.innerText = localStorage.getItem('soundText') || 'SOUND: OFF';
    color.className = localStorage.getItem('colorClass') || 'color-block';
    color.innerText = localStorage.getItem('colorText') || 'COLOR: LIGHT';
    step.innerText = localStorage.getItem('step') || 0;
    time.innerText = localStorage.getItem('time') || 0;
    message.innerText = localStorage.getItem('message');
    mineBursted = localStorage.getItem('mineBursted');

    if (!mineBursted) {launchTimer()};
    displayMinesAndFlags();
    firstClick = false;
  }
}

function setMode(event) {
  document.querySelector('.mode-easy').classList.remove('mode-active');
  document.querySelector('.mode-medium').classList.remove('mode-active');
  document.querySelector('.mode-hard').classList.remove('mode-active');

  if (event.target.matches('.mode-easy')) { 
    fieldSize = 10; 
    event.target.classList.add('mode-active');
  }
  if (event.target.matches('.mode-medium')) { 
    fieldSize = 15; 
    event.target.classList.add('mode-active');
  }
  if (event.target.matches('.mode-hard')) { 
    fieldSize = 25; 
    event.target.classList.add('mode-active');
  }

  prepareNewGame();
}

function startGame(clickedCell) {
  setGameField(clickedCell);
  displayMinesAndFlags();
  launchTimer();
  showMessage('start');
  firstClick = false;
}

function finishGameWin() {
  showFlags()
  writeRecord();
  stopTimer();
  showMessage('game-win');
  playSound('game-win');
}

function finishGameDefeat() {
  mineBursted = true;
  showMines();
  stopTimer();
  showMessage('game-defeat');
  playSound('game-defeat');
}

function prepareNewGame() {
  savedCells = '';
  stopTimer();
  createField(fieldSize);
  displayMinesAndFlags();
  showMessage('setup');
  clearStats();
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

function changeMinesQuantity(event) {
  minesQuantity = Number(event.target.value);
  document.querySelector('.mine-set-label').innerText = `MINES QUANTITY: ${minesQuantity}`;
}

modeBlock.addEventListener('click', setMode);
mineSetInput.addEventListener('input', changeMinesQuantity);
newGameBlock.addEventListener('click', prepareNewGame);
window.addEventListener('beforeunload', saveGame);

addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.matches('.sound-block')) {toggleSound()};
  if (event.target.matches('.color-block')) {toggleColor()};
  if (!(isWin() || isDefeat())) {
    if (event.target.className === 'cell') {
      if (firstClick) { startGame(event.target.attributes.num.value); }
      openCell(event.target);
      addStep();
      if (isWin()) {finishGameWin()};
      if (event.target.textContent === '*') { finishGameDefeat(); }
    }
  }
});

addEventListener('contextmenu', (event) => {
  event.preventDefault();
  if (!(isWin() || isDefeat())) {
    if (['cell', 'cell flag', 'cell question'].includes(event.target.className)) {
      changeCellState(event.target);
      displayMinesAndFlags();
    }
  }
});

document.addEventListener('mousedown', (event) => {
  if (!(event.target.className === 'mine-set-input')) {event.preventDefault();}
});
