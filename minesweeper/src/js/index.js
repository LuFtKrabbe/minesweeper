import './field.js';
import './mines.js';

function openCell(cell) {
  console.log(cell);
  if (Number(cell.innerText) === 0) {cell.classList.add('empty')};
  if (Number(cell.innerText) === 1) {cell.classList.add('cell-1')};

}

function getCellCoordinates(value) {
  const i = Math.floor(Number(value) / fieldSize);
  const j = Number(value) % fieldSize;
  return [i, j];
}


addEventListener('click', event => {
  event.preventDefault();
  if (event.target.className === 'cell') {
    openCell(event.target);
  }
})


addEventListener('mousedown', event => {
  event.preventDefault();
})