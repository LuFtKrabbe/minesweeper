import { createMenu, toggleColor, toggleSound } from './menu.js';
import { createInfo } from './info.js';
import { createField } from './field.js';
import { setGameField } from './mines.js';
import { openCell, changeCellState, addStep } from './cells.js';
import {
  countMines, showMines, showFlags, clearStats, showMessage, displayMinesAndFlags,
} from './stats.js';
import { displayRecords, writeRecord, toggleRecords } from './records.js';
import { launchTimer, stopTimer } from './timer.js';
import { playSound } from './sounds';

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
const recordsBlock = document.querySelector('.records-block');
const newGameBlock = document.querySelector('.new-game-block');
const mineSetInput = document.querySelector('.mine-set-input');

function saveGame() {
  const sound = document.querySelector('.sound-block');
  const color = document.querySelector('.color-block');
  const style = document.querySelector('.style');
  const recordsLabel = document.querySelector('.records-label');
  const recordsBlock = document.querySelector('.records-block');

  if (!firstClick) {
    const cells = document.querySelectorAll('.cell');
    const time = document.querySelector('.time-value');
    const step = document.querySelector('.step-value');
    const message = document.querySelector('.message');

    savedCells = [];
    cells.forEach((cell) => { savedCells.push([cell.className, cell.textContent]); });

    localStorage.setItem('mineBursted', mineBursted);
    localStorage.setItem('step', step.innerText);
    localStorage.setItem('time', time.innerText);
    localStorage.setItem('message', message.innerText);
    localStorage.setItem('cells', JSON.stringify(savedCells));
  }
  localStorage.setItem('field', fieldSize);
  localStorage.setItem('mines', minesQuantity);

  localStorage.setItem('soundClass', sound.className);
  localStorage.setItem('soundText', sound.innerText);
  localStorage.setItem('colorClass', color.className);
  localStorage.setItem('colorText', color.innerText);
  localStorage.setItem('colorStyle', style.href);
  localStorage.setItem('recordsLabel', recordsLabel.className);
  localStorage.setItem('recordsBlock', recordsBlock.className);
}

function loadGame() {
  const sound = document.querySelector('.sound-block');
  const color = document.querySelector('.color-block');
  const style = document.querySelector('.style');
  const recordsLabel = document.querySelector('.records-label');
  const recordsBlock = document.querySelector('.records-block');

  if (savedCells) {
    const cells = document.querySelectorAll('.cell');
    const time = document.querySelector('.time-value');
    const step = document.querySelector('.step-value');
    const message = document.querySelector('.message');

    cells.forEach((cell, key) => {
      cell.className = savedCells[key][0];
      cell.textContent = savedCells[key][1];
    });

    step.innerText = localStorage.getItem('step') || 0;
    time.innerText = localStorage.getItem('time') || 0;
    message.innerText = localStorage.getItem('message');
    if (localStorage.getItem('mineBursted') === 'true') {
      mineBursted = true;
    } else {
      mineBursted = false;
    }

    if (!mineBursted) { launchTimer(); }
    displayMinesAndFlags();
    firstClick = false;
  }

  sound.className = localStorage.getItem('soundClass') || 'sound-block';
  sound.innerText = localStorage.getItem('soundText') || 'SOUND: OFF';
  color.className = localStorage.getItem('colorClass') || 'color-block';
  color.innerText = localStorage.getItem('colorText') || 'COLOR: LIGHT';
  style.href = localStorage.getItem('colorStyle') || './src/sass/style-light.css';
  recordsLabel.className = localStorage.getItem('recordsLabel') || 'records-label';
  recordsBlock.className = localStorage.getItem('recordsBlock') || 'records-block';
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
  showFlags();
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
  localStorage.setItem('cells', JSON.stringify(''));
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
recordsBlock.addEventListener('click', toggleRecords);
window.addEventListener('beforeunload', saveGame);

addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.matches('.sound-block')) { toggleSound(); }
  if (event.target.matches('.color-block')) { toggleColor(); }
  if (event.target.textContent === '*') { finishGameDefeat(); }
  if (!(isWin() || isDefeat())) {
    if (event.target.className === 'cell') {
      if (firstClick) { startGame(event.target.attributes.num.value); }
      openCell(event.target);
      addStep();
      if (isWin()) { finishGameWin(); }
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
  if (!(event.target.className === 'mine-set-input')) { event.preventDefault(); }
});
