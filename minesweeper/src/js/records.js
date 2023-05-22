let records = JSON.parse(localStorage.getItem('records')) ?? [];

export function displayRecords() {
  let records = JSON.parse(localStorage.getItem('records')) ?? [];
  let recordsValue = document.querySelectorAll('.record');
  
  recordsValue.forEach((record, key) => {
    if (records[key]) {
      record.innerText = `${key + 1}. TIME: ${records[key][0]} s, STEPS: ${records[key][1]}`
    } else {
      record.innerText = `${key + 1}. -----`
    }
  })
}
  
export function writeRecord() {
  const stepValue = document.querySelector('.step-value');
  const timeValue = document.querySelector('.time-value');

  records.unshift([timeValue.innerText, stepValue.innerText]);
  if (records.length === 11) {records.pop()};

  localStorage.setItem('records', JSON.stringify(records));

  displayRecords();
}

export function toggleRecords() {
  const recordsLabel = document.querySelector('.records-label');
  const recordsBlock = document.querySelector('.records-block');
  recordsLabel.classList.toggle('mode-active');
  recordsBlock.classList.toggle('records-mode-active');
}