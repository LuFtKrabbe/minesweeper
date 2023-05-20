let timer = false;

export function launchTimer() {
  const timeValue = document.querySelector('.time-value');
  timer = setInterval(() => {
    timeValue.innerText = Number(timeValue.innerText) + 1;
    if (Number(timeValue.innerText) === 999) { clearTimeout(timer); }
  }, 1000);
}
  
export function stopTimer() {
  clearTimeout(timer);
}