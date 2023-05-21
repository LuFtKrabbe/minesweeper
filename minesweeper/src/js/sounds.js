export function playSound(sound) {
  if (document.querySelector('.sound-block').matches('.mode-active')) {
    const track = new Audio;

    if (sound === 'set-flag') {track.src = './assets/sounds/set-flag.mp3';}
    if (sound === 'set-question') {track.src = './assets/sounds/set-question.mp3';}
    if (sound === 'game-win') {track.src = './assets/sounds/game-win.mp3';}
    if (sound === 'game-defeat') {track.src = './assets/sounds/game-defeat.mp3';}
    if (sound === 'click-cell') {track.src = './assets/sounds/click-cell.mp3';}
    
    track.play();
  }
}