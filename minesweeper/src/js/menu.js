export function createMenu(minesQuantity, fieldSize) {
  const menu = document.createElement('div');
  menu.className = 'menu';
  document.body.append(menu);

  const modeBlock = document.createElement('div');
  modeBlock.className = 'mode-block';
  menu.append(modeBlock);

  const modeEasy = document.createElement('div');
  modeEasy.className = 'mode-easy';
  modeEasy.innerText = 'EASY\n(10X10)';
  modeBlock.append(modeEasy);

  const modeMedium = document.createElement('div');
  modeMedium.className = 'mode-medium';
  modeMedium.innerText = 'MEDIUM\n(15X15)';
  modeBlock.append(modeMedium);

  const modeHard = document.createElement('div');
  modeHard.className = 'mode-hard';
  modeHard.innerText = 'HARD\n(25X25)';
  modeBlock.append(modeHard);

  const mineSetBlock = document.createElement('div');
  mineSetBlock.className = 'mine-set-block';
  menu.append(mineSetBlock);

  const mineSetLabel = document.createElement('div');
  mineSetLabel.className = 'mine-set-label';
  mineSetLabel.innerText = `MINES QUANTITY: ${minesQuantity}`;
  mineSetBlock.append(mineSetLabel);

  const mineSetInput = document.createElement('input');
  mineSetInput.className = 'mine-set-input';
  mineSetInput.type = 'range';
  mineSetInput.min = '10';
  mineSetInput.max = '99';
  mineSetInput.value = `${minesQuantity}`;
  mineSetBlock.append(mineSetInput);

  const mediaBlock = document.createElement('div');
  mediaBlock.className = 'media-block';
  menu.append(mediaBlock);

  const soundBlock = document.createElement('div');
  soundBlock.className = 'sound-block';
  soundBlock.innerText = 'SOUND: OFF';
  mediaBlock.append(soundBlock);

  const colorBlock = document.createElement('div');
  colorBlock.className = 'color-block';
  colorBlock.innerText = 'COLOR: LIGHT';
  mediaBlock.append(colorBlock);

  const newGameBlock = document.createElement('div');
  newGameBlock.className = 'new-game-block';
  newGameBlock.innerText = 'START NEW GAME';
  menu.append(newGameBlock);

  const recordsBlock = document.createElement('div');
  recordsBlock.className = 'records-block';
  menu.append(recordsBlock);

  const recordsLabel = document.createElement('div');
  recordsLabel.className = 'records-label';
  recordsLabel.innerText = 'RECORDS';
  recordsBlock.append(recordsLabel);

  const recordsValue = document.createElement('div');
  recordsValue.className = 'records-value';
  recordsBlock.append(recordsValue);

  for (let i = 1; i <= 10; i += 1) {
    const record = document.createElement('div');
    record.className = 'record';
    recordsValue.append(record);
  }

  if (fieldSize === 10) { document.querySelector('.mode-easy').classList.add('mode-active'); }
  if (fieldSize === 15) { document.querySelector('.mode-medium').classList.add('mode-active'); }
  if (fieldSize === 25) { document.querySelector('.mode-hard').classList.add('mode-active'); }
}

export function toggleSound() {
  const soundBlock = document.querySelector('.sound-block');
  soundBlock.classList.toggle('mode-active');
  if (soundBlock.matches('.mode-active')) {
    soundBlock.innerText = 'SOUND: ON';
  } else {
    soundBlock.innerText = 'SOUND: OFF';
  }
}

export function toggleColor() {
  const soundBlock = document.querySelector('.color-block');
  const styleFile = document.querySelector('.style');
  soundBlock.classList.toggle('mode-active');
  if (soundBlock.matches('.mode-active')) {
    styleFile.href = './src/sass/style-dark.css';
    soundBlock.innerText = 'COLOR: DARK';
  } else {
    styleFile.href = './src/sass/style-light.css';
    soundBlock.innerText = 'COLOR: LIGHT';
  }
}
