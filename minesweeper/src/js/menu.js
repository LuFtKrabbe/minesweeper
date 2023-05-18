export function createMenu(minesQuantity) {
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
    mineSetInput.min = '1';
    mineSetInput.max = '99';
    mineSetInput.value = `${minesQuantity}`;
    mineSetBlock.append(mineSetInput);
    
    const newGameBlock = document.createElement('div');
    newGameBlock.className = 'new-game-block';
    newGameBlock.innerText = 'START NEW GAME';
    menu.append(newGameBlock);
    
    const recordsBlock = document.createElement('div');
    recordsBlock.className = 'records-block';
    recordsBlock.innerText = 'RECORDS';
    menu.append(recordsBlock);
}
