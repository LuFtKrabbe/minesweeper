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

const mineValue = document.querySelector('.mine-value');
const flagValue = document.querySelector('.flag-value');
const stepValue = document.querySelector('.step-value');
const timeValue = document.querySelector('.time-value');
const modeBlock = document.querySelector('.mode-block');
const newGameBlock = document.querySelector('.new-game-block');
const mineSetInput = document.querySelector('.mine-set-input');

function saveGame() {
  if (!firstClick) {
    const cells = document.querySelectorAll('.cell');
    const time = document.querySelector('.time-value');
    const step = document.querySelector('.step-value');
    const messageInfo = document.querySelector('.message');
    const sound = document.querySelector('.sound-block');
    const color = document.querySelector('.color-block');
  
    savedCells = [];
    
    cells.forEach((cell) => {
      savedCells.push([cell.className, cell.textContent]);
    })

    localStorage.setItem('mineBursted', mineBursted);
    localStorage.setItem('soundClass', sound.className);
    localStorage.setItem('soundText', sound.innerText);
    localStorage.setItem('colorClass', color.className);
    localStorage.setItem('colorText', color.innerText);
    localStorage.setItem('step', step.innerText);
    localStorage.setItem('time', time.innerText);
    localStorage.setItem('message', messageInfo.innerText);
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
    const messageInfo = document.querySelector('.message');
    const sound = document.querySelector('.sound-block');
    const color = document.querySelector('.color-block');

    cells.forEach((cell, key) => {
        cell.className = savedCells[key][0];
        cell.textContent = savedCells[key][1];
    })
    firstClick = false;

    sound.className = localStorage.getItem('soundClass') || 'sound-block';
    sound.innerText = localStorage.getItem('soundText') || 'SOUND: OFF';
    color.className = localStorage.getItem('colorClass') || 'color-block';
    color.innerText = localStorage.getItem('colorText') || 'COLOR: LIGHT';

    step.innerText = localStorage.getItem('step') || 0;
    time.innerText = localStorage.getItem('time') || 0;
    messageInfo.innerText = localStorage.getItem('message');
    mineBursted = localStorage.getItem('mineBursted');

    if (!mineBursted) {launchTimer()};
    displayMinesAndFlags();
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

function showMessage(text) {
  const message = document.querySelector('.message');
  message.innerText = text;
}

function startGame(clickedCell) {
  setGameField(clickedCell);
  displayMinesAndFlags();
  launchTimer();
  showMessage('Find all mines!');
  firstClick = false;
}

function finishGameWin() {
  showFlags()
  writeRecord();
  stopTimer();
  showMessage(`Hooray! You found all mines in \n${timeValue.innerText} second(s) and ${stepValue.innerText} move(s)!`);
  if (document.querySelector('.sound-block').matches('.mode-active')) {
    const playWin = new Audio('./assets/sounds/game-win.mp3');
    playWin.play();
  }
}

function finishGameDefeat() {
  mineBursted = true;

  showMines();
  stopTimer();
  showMessage('Game over. Try again!');
  if (document.querySelector('.sound-block').matches('.mode-active')) {
    const playDefeat = new Audio('./assets/sounds/game-defeat.mp3');
    playDefeat.play();
  }
}

function prepareNewGame() {
  stopTimer();
  savedCells = '';
  createField(fieldSize);
  displayMinesAndFlags();
  showMessage('Choose the field size and set the mine quantity');
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

function toggleSound() {
  const soundBlock = document.querySelector('.sound-block');
  soundBlock.classList.toggle('mode-active');
  if (soundBlock.matches('.mode-active')) {
    soundBlock.innerText = 'SOUND: ON';
  } else {
    soundBlock.innerText = 'SOUND: OFF';
  }
}

function toggleColor() {
  const soundBlock = document.querySelector('.color-block');
  soundBlock.classList.toggle('mode-active');
  if (soundBlock.matches('.mode-active')) {
    soundBlock.innerText = 'COLOR: DARK';
  } else {
    soundBlock.innerText = 'COLOR: LIGHT';
  }
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
  if (event.target.textContent === '*') { finishGameDefeat(); }
  if (isWin() || isDefeat()) { event.stopImmediatePropagation(); }
  if (event.target.className === 'cell') {
    if (firstClick) { startGame(event.target.attributes.num.value); }
    openCell(event.target);
    stepValue.innerText = Number(stepValue.innerText) + 1;
    if (isWin()) { 
      finishGameWin(); 
    } else {
      if (document.querySelector('.sound-block').matches('.mode-active')) {
        const playClick = new Audio('./assets/sounds/click-cell.mp3');
        playClick.play();
      }
    }
  }
});

addEventListener('contextmenu', (event) => {
  event.preventDefault();
  if (isWin() || isDefeat()) { event.stopImmediatePropagation(); }
  if (['cell', 'cell flag', 'cell question'].includes(event.target.className)) {
    changeCellState(event.target);
    displayMinesAndFlags();
  }
});

document.addEventListener('mousedown', (event) => {
  //if ((event.target.className === 'mine-set-input')) {event.preventDefault();}
});
