export function showFlags() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => { if (cell.className === 'cell') { cell.classList.add('flag'); } });
}

export function showMines() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => { if (cell.innerText === '*') { cell.classList.add('mine'); } });
}

export function countMines() {
  const cells = document.querySelectorAll('.cell');
  let counter = 0;
  cells.forEach((cell) => { if (cell.textContent === '*') { counter += 1; } });
  return counter;
}

function countFlags() {
  const cells = document.querySelectorAll('.cell');
  let counter = 0;
  cells.forEach((cell) => { if (cell.matches('.flag')) { counter += 1; } });
  return counter;
}

export function displayMinesAndFlags() {
  const flags = countFlags();
  const mines = countMines();

  document.querySelector('.flag-value').innerText = `${flags}`;

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