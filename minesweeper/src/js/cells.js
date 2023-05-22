import { playSound } from './sounds';

export function openCell(clickedCell) {
  const fieldSize = document.querySelector('.cell-row').childElementCount;

  if (!(clickedCell.matches('.flag') || clickedCell.matches('.question'))) { clickedCell.classList.add('opened'); }

  function openCellsAroundNull() {
    const i = Math.floor(Number(clickedCell.attributes.num.value) / fieldSize);
    const j = Number(clickedCell.attributes.num.value) % fieldSize;

    for (let m = -1; m <= 1; m += 1) {
      for (let n = -1; n <= 1; n += 1) {
        if ((i + m >= 0) && (i + m < fieldSize) && (j + n >= 0) && (j + n < fieldSize)) {
          const currentCell = document.querySelector(`[num="${(i + m) * fieldSize + (j + n)}"]`);
          if ((!currentCell.matches('.empty'))) { openCell(currentCell); }
        }
      }
    }
  }

  if (clickedCell.innerText === '1') { clickedCell.classList.add('cell-1'); }
  if (clickedCell.innerText === '2') { clickedCell.classList.add('cell-2'); }
  if (clickedCell.innerText === '3') { clickedCell.classList.add('cell-3'); }
  if (clickedCell.innerText === '4') { clickedCell.classList.add('cell-4'); }
  if (clickedCell.innerText === '5') { clickedCell.classList.add('cell-5'); }
  if (clickedCell.innerText === '6') { clickedCell.classList.add('cell-6'); }
  if (clickedCell.innerText === '7') { clickedCell.classList.add('cell-7'); }
  if (clickedCell.innerText === '8') { clickedCell.classList.add('cell-8'); }
  if (clickedCell.innerText === '0') { clickedCell.classList.add('empty'); }
  if (clickedCell.innerText === '0') { openCellsAroundNull(); }
}

export function changeCellState(clickedCell) {
  if (clickedCell.matches('.flag')) {
    clickedCell.classList.toggle('flag');
    clickedCell.classList.toggle('question');
    playSound('set-question');
  } else if (clickedCell.matches('.question')) {
    clickedCell.classList.toggle('question');
  } else {
    clickedCell.classList.toggle('flag');
    playSound('set-flag');
  }
}

export function addStep() {
  const stepValue = document.querySelector('.step-value');
  stepValue.innerText = Number(stepValue.innerText) + 1;
  playSound('click-cell');
}
