import { createMenu } from './menu.js';
import { createInfo } from './info.js';
import { createField } from './field.js';
import { setGameField } from './mines.js';
import { openCell } from './cells.js';
import { changeCellState } from './cells.js';

let fieldSize = Number(localStorage.getItem('field')) ?? 10;
let minesQuantity = Number(localStorage.getItem('mines')) ?? 10;
let firstClick = true;

function setLocalStorage() {
  localStorage.setItem('field', fieldSize);
  localStorage.setItem('mines', minesQuantity);
}

window.addEventListener('beforeunload', setLocalStorage);

createMenu(minesQuantity);
createInfo();
createField(fieldSize);

const stepValue = document.querySelector('.step-value');
const timeValue = document.querySelector('.time-value');
const mineSetInput = document.querySelector('.mine-set-input');

addEventListener('click', event => {
  if (event.target.className === 'cell' && firstClick) {
    setGameField(event.target.attributes.num.value);

    let timerId = setInterval(() => {
      timeValue.innerText = Number(timeValue.innerText) + 1;
      if (Number(timeValue.innerText) === 999) {clearTimeout(timerId)};
    }, 1000);
    firstClick = false;

  }
  if (event.target.className === 'cell') {
    openCell(event.target);
    stepValue.innerText = Number(stepValue.innerText) + 1;
  }
})

addEventListener('contextmenu', event => {
  if (event.target.matches('.cell')) {
    if (!event.target.matches('.opened') && !event.target.matches('.mine')) {
      changeCellState(event.target);
    }
  }
})

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

