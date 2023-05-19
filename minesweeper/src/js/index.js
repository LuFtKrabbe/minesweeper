import { createMenu } from './menu.js';
import { createInfo } from './info.js';
import { createField } from './field.js';
import { setGameField } from './mines.js';
import { openCell } from './cells.js';
import { changeCellState } from './cells.js';

let fieldSize = Number(localStorage.getItem('field')) ?? 10;
let minesQuantity = Number(localStorage.getItem('mines')) ?? 10;
let firstClick = true;
let timer = 0;


function setLocalStorage() {
  localStorage.setItem('field', fieldSize);
  localStorage.setItem('mines', minesQuantity);
}

window.addEventListener('beforeunload', setLocalStorage);

createMenu(minesQuantity, fieldSize);
createInfo();
createField(fieldSize);

function setMode(clickedMode) {
  document.querySelector('.mode-easy').classList.remove('mode-active');
  document.querySelector('.mode-medium').classList.remove('mode-active');
  document.querySelector('.mode-hard').classList.remove('mode-active');
  clickedMode.classList.add('mode-active');

  fieldSize = Number(clickedMode.id);
  if (firstClick === true) {createField(fieldSize);};
}

const stepValue = document.querySelector('.step-value');
const timeValue = document.querySelector('.time-value');
const mineSetInput = document.querySelector('.mine-set-input');
const cells = document.querySelectorAll('.cell');

addEventListener('click', event => {
  if (event.target.className === 'cell') {
    if (firstClick) {
      setGameField(event.target.attributes.num.value);
      displayMinesAndFlagsQuantity();
      launchTimer();
      firstClick = false;
    }
    openCell(event.target);
    stepValue.innerText = Number(stepValue.innerText) + 1;
  }
  const modes = ['mode-easy', 'mode-medium', 'mode-hard'];
  console.log(event.target);
  if (event.target.className === 'cell opened mine') {
    clearTimeout(timer);
  };
  if (modes.includes(event.target.className)) {setMode(event.target)};
  if (event.target.className === 'new-game-block') {
    firstClick = true;
    createField(fieldSize);
  };
})

addEventListener('contextmenu', event => {
  const allowedClasses = ['cell', 'cell flag', 'cell question'];
  if (allowedClasses.includes(event.target.className)) {
    changeCellState(event.target);
    displayMinesAndFlagsQuantity();
  }
})

function countFlags() {
  let counter = 0;
  cells.forEach((cell) => {if (cell.matches('.flag')) {counter += 1;}});
  return counter;
} 

function countMines() {
  let counter = 0;
  cells.forEach((cell) => {if (cell.textContent === '*') {counter += 1;}});
  return counter;
} 

function displayMinesAndFlagsQuantity() {
  const flags = countFlags();
  const mines = countMines();

  document.querySelector('.flag-value').innerText = `${flags}`

  if ((mines - flags) >= 0) {
    document.querySelector('.mine-value').innerText = `${mines - flags}`;
    document.querySelector('.mine-value').classList.remove('mode-active');
    document.querySelector('.flag-value').classList.remove('mode-active');
  } else {
    document.querySelector('.mine-value').innerText = '0';
    document.querySelector('.mine-value').classList.add('mode-active');
    document.querySelector('.flag-value').classList.add('mode-active');
  }
} 

function launchTimer() {
  timer = setInterval(() => {
    timeValue.innerText = Number(timeValue.innerText) + 1;
    if (Number(timeValue.innerText) === 999) {clearTimeout(timer)};
  }, 1000);
} 

mineSetInput.addEventListener('input', event => {
  minesQuantity = Number(event.target.value);
  document.querySelector('.mine-set-label').innerText = `MINES QUANTITY: ${minesQuantity}`;
})

document.querySelector('.field').addEventListener('mousedown', event => {
  event.preventDefault();
})

document.querySelector('.field').addEventListener('click', event => {
  event.preventDefault();
})

document.querySelector('.field').addEventListener('contextmenu', event => {
  event.preventDefault();
})

