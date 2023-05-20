import { createMenu } from './menu.js';
import { createInfo } from './info.js';
import { createField } from './field.js';
import { setGameField } from './mines.js';
import { openCell, changeCellState } from './cells.js';

let fieldSize = Number(localStorage.getItem('field')) ?? 10;
let minesQuantity = Number(localStorage.getItem('mines')) ?? 10;
let records = JSON.parse(localStorage.getItem('records')) ?? [];
let firstClick = true;
let mineBursted = false;
let timer = 0;

function setLocalStorage() {
  localStorage.setItem('field', fieldSize);
  localStorage.setItem('mines', minesQuantity);
}

window.addEventListener('beforeunload', setLocalStorage);

createMenu(minesQuantity, fieldSize);
createInfo();
createField(fieldSize);
displayRecords();

function displayRecords() {
  let recordsValue = document.querySelectorAll('.record');
  recordsValue.forEach((record) => {
    if (records[Number(record.id) - 1]) {
      record.innerText = `${Number(record.id)}. TIME: ${records[Number(record.id) - 1][0]} s, STEPS: ${records[Number(record.id) - 1][1]}`
    } else {
      record.innerText = `${Number(record.id)}. -----`
    }
  })
}

function writeRecord() {
  records.unshift([timeValue.innerText, stepValue.innerText]);
  if (records.length === 11) {records.pop()};
  displayRecords();
  localStorage.setItem('records', JSON.stringify(records));
}

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

const rightClickStates = ['cell', 'cell flag', 'cell question'];
const mineValue = document.querySelector('.mine-value');
const flagValue = document.querySelector('.flag-value');
const stepValue = document.querySelector('.step-value');
const timeValue = document.querySelector('.time-value');
const modeBlock = document.querySelector('.mode-block');
const newGameBlock = document.querySelector('.new-game-block');
let field = document.querySelector('.field');

const mineSetInput = document.querySelector('.mine-set-input');
const message = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

message.innerText = 'Choose the field size and set the mine quantity';

function launchTimer() {
  timer = setInterval(() => {
    timeValue.innerText = Number(timeValue.innerText) + 1;
    if (Number(timeValue.innerText) === 999) { clearTimeout(timer); }
  }, 1000);
}

function stopTimer() {
  clearTimeout(timer);
}

function startGame(clickedCell) {
  setGameField(clickedCell);
  displayMinesAndFlagsQuantity();
  launchTimer();
  message.innerText = 'Find all mines!';
  firstClick = false;
}

function finishGameWin() {
  message.innerText = `Hooray! You found all mines in \n${timeValue.innerText} second(s) and ${stepValue.innerText} move(s)!`;
  cells.forEach((cell) => { if (cell.className === 'cell') { cell.classList.add('flag'); } });
  writeRecord();
  stopTimer();
}

function finishGameDefeat() {
  message.innerText = 'Game over. Try again!';
  mineBursted = true;
  stopTimer();
}

function prepareNewGame() {
  stopTimer();
  createField(fieldSize);
  mineValue.innerText = 0;
  flagValue.innerText = 0;
  timeValue.innerText = 0;
  stepValue.innerText = 0;
  firstClick = true;
  mineBursted = false;
}

function countFlags() {
  let counter = 0;
  cells.forEach((cell) => { if (cell.matches('.flag')) { counter += 1; } });
  return counter;
}

function countMines() {
  let counter = 0;
  cells.forEach((cell) => { if (cell.textContent === '*') { counter += 1; } });
  return counter;
}

function isFinished() {
  let allCells = 0;
  let openedCells = 0;
  cells.forEach((cell) => {
    if (cell.matches('.opened')) { openedCells += 1; }
    allCells += 1;
  });
  if ((allCells - openedCells) === countMines()) { return true; }
  return false;
}

function displayMinesAndFlagsQuantity() {
  const flags = countFlags();
  const mines = countMines();

  flagValue.innerText = `${flags}`;

  if ((mines - flags) >= 0) {
    mineValue.innerText = `${mines - flags}`;
    mineValue.classList.remove('mode-active');
    flagValue.classList.remove('mode-active');
  } else {
    mineValue.innerText = '0';
    mineValue.classList.add('mode-active');
    flagValue.classList.add('mode-active');
  }
}

modeBlock.addEventListener('click', setMode);
newGameBlock.addEventListener('click', prepareNewGame);

addEventListener('click', (event) => {
  event.preventDefault();
  if (isFinished() || mineBursted) { event.stopImmediatePropagation(); }
  if (event.target.className === 'cell') {
    if (firstClick) { startGame(event.target.attributes.num.value); }
    openCell(event.target);
    stepValue.innerText = Number(stepValue.innerText) + 1;
    if (isFinished()) { finishGameWin(); }
  }
  if (event.target.textContent === '*') { finishGameDefeat(); }
});

addEventListener('contextmenu', (event) => {
  event.preventDefault();
  if (isFinished() || mineBursted) { event.stopImmediatePropagation(); }
  if (rightClickStates.includes(event.target.className)) {
    changeCellState(event.target);
    displayMinesAndFlagsQuantity();
  }
});

addEventListener('mousedown', (event) => {
  //event.preventDefault();
});

mineSetInput.addEventListener('input', (event) => {
  minesQuantity = Number(event.target.value);
  document.querySelector('.mine-set-label').innerText = `MINES QUANTITY: ${minesQuantity}`;
});
