import './menu.js';
import './info.js';
import './field.js';
import './mines.js';
import './cells.js';
import './settings.js';


document.querySelector('.field').addEventListener('mousedown', event => {
  event.preventDefault();
})

document.querySelector('.field').addEventListener('click', event => {
  event.preventDefault();
})

document.querySelector('.field').addEventListener('contextmenu', event => {
  event.preventDefault();
})
