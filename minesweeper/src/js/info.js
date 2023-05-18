let firstTimeClick = true;

const menu = document.createElement('div');
menu.className = 'info';
document.body.append(menu);

const mineBlock = document.createElement('div');
mineBlock.className = 'mine-block';
menu.append(mineBlock);

const mineLabel = document.createElement('div');
mineLabel.className = 'mine-label';
mineLabel.innerText = 'MINES';
mineBlock.append(mineLabel);

const mineValue = document.createElement('div');
mineValue.className = 'mine-value';
mineValue.innerText = '0';
mineBlock.append(mineValue);

const stepBlock = document.createElement('div');
stepBlock.className = 'step-block';
menu.append(stepBlock);

const stepLabel = document.createElement('div');
stepLabel.className = 'step-label';
stepLabel.innerText = 'STEPS';
stepBlock.append(stepLabel);

const stepValue = document.createElement('div');
stepValue.className = 'step-value';
stepValue.innerText = '0';
stepBlock.append(stepValue);

const timeBlock = document.createElement('div');
timeBlock.className = 'time-block';
menu.append(timeBlock);

const timeLabel = document.createElement('div');
timeLabel.className = 'time-label';
timeLabel.innerText = 'TIME';
timeBlock.append(timeLabel);

const timeValue = document.createElement('div');
timeValue.className = 'time-value';
timeValue.innerText = '0';
timeBlock.append(timeValue);

addEventListener('click', event => {
    if (event.target.className === 'cell') {
        stepValue.innerText =  Number(stepValue.innerText) + 1;
    }
})

addEventListener('click', event => {
    if (event.target.matches('.mine')) {clearTimeout(timerId)};
    if (firstTimeClick && event.target.className === 'cell') {
        let timerId = setInterval(() => {
            timeValue.innerText = Number(timeValue.innerText) + 1;
            if (Number(timeValue.innerText) === 999) {clearTimeout(timerId)};
        }, 1000);
    }
    firstTimeClick = false;
})

