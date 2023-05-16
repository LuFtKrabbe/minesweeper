import './hello.js';

const fieldSize = 15;

const field = document.createElement('div');
field.className = 'field';
document.body.append(field);

class Cell {
  constructor(num) {
    this.elem = document.createElement('div');
    this.elem.className = 'cell';
    this.elem.setAttribute('num', `${num}`);
  }
}

function createField() {
  for (let i = 0; i < fieldSize; i += 1) {
    const cellRow = document.createElement('div');
    cellRow.className = 'cell-row';
    field.append(cellRow);
    for (let j = 0; j < fieldSize; j += 1) {
      const cellNumber = i * fieldSize + j;
      const newCell = new Cell(cellNumber);
      cellRow.append(newCell.elem);
    }
  }
}

createField();
