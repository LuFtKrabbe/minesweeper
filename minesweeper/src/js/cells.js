function openCell(cell) {
  if (Number(cell.innerText) === 0) {cell.classList.add('empty')};
  if (Number(cell.innerText) === 1) {cell.classList.add('cell-1')};
  if (Number(cell.innerText) === 2) {cell.classList.add('cell-2')};
  if (Number(cell.innerText) === 3) {cell.classList.add('cell-3')};
  if (Number(cell.innerText) === 4) {cell.classList.add('cell-4')};
  if (Number(cell.innerText) === 5) {cell.classList.add('cell-5')};
  if (Number(cell.innerText) === 6) {cell.classList.add('cell-6')};
  if (Number(cell.innerText) === 7) {cell.classList.add('cell-7')};
  if (Number(cell.innerText) === 8) {cell.classList.add('cell-8')};
  if (cell.innerText === '*') {cell.classList.add('mine')};
  cell.classList.add('opened');
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

function getCellCoordinates(value) {
  const i = Math.floor(Number(value) / fieldSize);
  const j = Number(value) % fieldSize;
  return [i, j];
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