export let fieldSize = Number(localStorage.getItem('field')) ?? 10;
export let minesQuantity = Number(localStorage.getItem('mines')) ?? 10;

function setLocalStorage() {
    localStorage.setItem('field', fieldSize);
    localStorage.setItem('mines', minesQuantity);
}

window.addEventListener('beforeunload', setLocalStorage);

document.addEventListener('input', event => {
    minesQuantity = Number(event.target.value);
    document.querySelector('.mine-set-label').innerText = `Mines quantity: ${minesQuantity}`;
})