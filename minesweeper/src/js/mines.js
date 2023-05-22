export function setGameField(clickedCell) {
  const minesQuantity = document.querySelector('.mine-set-input').valueAsNumber;
  const fieldSize = document.querySelector('.cell-row').childElementCount;
  const minedCells = [];
  const minedFieldArr = [];

  function chooseMinedCells() {
    while (minedCells.length !== minesQuantity) {
      const randomCell = Math.floor(Math.random() * fieldSize * fieldSize).toString();
      if (!minedCells.includes(randomCell) && (randomCell !== clickedCell)) {
        minedCells.push(randomCell);
      }
      continue;
    }
  }

  function createMinedFieldArr() {
    for (let i = 0; i < fieldSize; i += 1) {
      const fieldRow = [];
      for (let j = 0; j < fieldSize; j += 1) {
        const cellNumber = (i * fieldSize + j).toString();
        if (minedCells.includes(cellNumber)) {
          fieldRow.push('*');
        } else {
          fieldRow.push(0);
        }
      }
      minedFieldArr.push(fieldRow);
    }
  }

  function setCellsDanger() {
    function growDangerAroundMine(i, j) {
      for (let m = -1; m <= 1; m += 1) {
        for (let n = -1; n <= 1; n += 1) {
          if ((i + m >= 0) && (i + m < minedFieldArr[0].length) && (j + n >= 0) && (j + n < minedFieldArr.length)) {
            if (minedFieldArr[i + m][j + n] === '*') { continue; }
            minedFieldArr[i + m][j + n] += 1;
          }
        }
      }
    }

    for (let i = 0; i < minedFieldArr.length; i += 1) {
      for (let j = 0; j < minedFieldArr[0].length; j += 1) {
        if (minedFieldArr[i][j] === '*') { growDangerAroundMine(i, j); }
      }
    }
  }

  function displayField() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((value, key) => { value.innerText = minedFieldArr.flat()[key]; });
  }

  chooseMinedCells();
  createMinedFieldArr();
  setCellsDanger();
  displayField();
}
