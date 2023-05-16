import { fieldSize } from './settings.js';
import { minesQuantity } from './settings.js';

let firstClick = true;

function pickRandomCellsForMines(clickedCell) {
  const minedCells = [];

  while(minedCells.length !== minesQuantity) {
    const randomCell = Math.floor(Math.random() * fieldSize * fieldSize).toString();
    if (!minedCells.includes(randomCell) && (randomCell !== clickedCell)) {
      minedCells.push(randomCell);
    }
    continue;
  }

  return minedCells;
}

function createMinedFieldArr(clickedCell) {

  const minedCells = pickRandomCellsForMines(clickedCell);
  const minedFieldArr = [];

  const cellMineOn = true;
  const cellMineOff = 0;
  
  for (let i = 0; i < fieldSize; i += 1) {
    const fieldRow = [];
    for (let j = 0; j < fieldSize; j += 1) {
      const cellNumber = (i * fieldSize + j).toString();
      if (minedCells.includes(cellNumber)) {
        fieldRow.push(cellMineOn);
      } else {
        fieldRow.push(cellMineOff);
      }
    }
    minedFieldArr.push(fieldRow);
  }

  return minedFieldArr;
}

function setCellsDangerValue(clickedCell) {
  
  const minedFieldArr = createMinedFieldArr(clickedCell);

  function growDangerAroundMine(i, j) {
    for (let m = -1; m <= 1; m += 1) {
      for (let n = -1; n <= 1; n += 1) {
        if ((i + m >= 0) && (i + m < minedFieldArr[0].length) && (j + n >= 0) && (j + n < minedFieldArr.length)) {
          if (minedFieldArr[i + m][j + n] === true) {continue}
          minedFieldArr[i + m][j + n] += 1;
        }
      }
    }
  }

  for (let i = 0; i < minedFieldArr.length; i += 1) {
    for (let j = 0; j < minedFieldArr[0].length; j += 1) {
      if (minedFieldArr[i][j] === true) {growDangerAroundMine(i, j)};
    }
  }
  
  for (let i = 0; i < minedFieldArr.length; i += 1) {
    for (let j = 0; j < minedFieldArr[0].length; j += 1) {
      if (minedFieldArr[i][j] === true) {minedFieldArr[i][j] = "*"};
    }
  }

  displayField(minedFieldArr);

  return minedFieldArr;
}

function displayField(minedFieldArr) {

  const field = document.querySelector('.field');
  const cells = field.querySelectorAll('.cell');

  console.log(minedFieldArr.flat());
  cells.forEach((value, key) => {
    (value.innerText = minedFieldArr.flat()[key]);
  })
}

let currentMinedField = [];

addEventListener('click', event => {
  if (event.target.className === 'cell' && firstClick) {
    currentMinedField = setCellsDangerValue(event.target.attributes.num.value);
    firstClick = false;
    console.log(currentMinedField)
  }
})
