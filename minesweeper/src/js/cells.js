import { fieldSize } from "./settings"
import { currentMinedField } from "./mines"

function openCell(cell) {

  cell.classList.add('opened');

  function openCellsAroundNull() {
    const i = Math.floor(Number(cell.attributes.num.value) / fieldSize);
    const j = Number(cell.attributes.num.value) % fieldSize;

    for (let m = -1; m <= 1; m += 1) {
      for (let n = -1; n <= 1; n += 1) {
        if ((i + m >= 0) && (i + m < currentMinedField[0].length) && (j + n >= 0) && (j + n < currentMinedField.length)) {
          const currentCell = document.querySelector(`[num="${(i + m) * fieldSize + (j + n)}"]`);
          if ((!currentCell.matches('.empty'))) {openCell(currentCell)};
        }
      }
    }
  }

  if (Number(cell.innerText) === 0) {cell.classList.add('empty')};
  if (Number(cell.innerText) === 0) {openCellsAroundNull()};
  if (Number(cell.innerText) === 1) {cell.classList.add('cell-1')};
  if (Number(cell.innerText) === 2) {cell.classList.add('cell-2')};
  if (Number(cell.innerText) === 3) {cell.classList.add('cell-3')};
  if (Number(cell.innerText) === 4) {cell.classList.add('cell-4')};
  if (Number(cell.innerText) === 5) {cell.classList.add('cell-5')};
  if (Number(cell.innerText) === 6) {cell.classList.add('cell-6')};
  if (Number(cell.innerText) === 7) {cell.classList.add('cell-7')};
  if (Number(cell.innerText) === 8) {cell.classList.add('cell-8')};

  if (cell.innerText === '*') {cell.classList.add('mine')};
}

function changeState(cell) {
  if (cell.matches('.flag')) {
    cell.classList.toggle('flag');
    cell.classList.toggle('question');
  } else if (cell.matches('.question')) {
    cell.classList.toggle('question');
  } else {
    cell.classList.toggle('flag');
  }
  console.log(cell);
}
  
addEventListener('click', event => {
  if (event.target.className === 'cell') { //only if string == 'cell' without any other classes
    openCell(event.target);
  }
})

addEventListener('contextmenu', event => {
  if (event.target.matches('.cell')) {
    if (!event.target.matches('.opened')) {
      changeState(event.target);
    }
  }
})