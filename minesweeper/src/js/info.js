export function createInfo() {
  const info = document.createElement('div');
  info.className = 'info';
  document.body.append(info);

  const stats = document.createElement('div');
  stats.className = 'stats';
  info.append(stats);

  const mineBlock = document.createElement('div');
  mineBlock.className = 'mine-block';
  stats.append(mineBlock);

  const mineLabel = document.createElement('div');
  mineLabel.className = 'mine-label';
  mineLabel.innerText = 'MINES';
  mineBlock.append(mineLabel);

  const mineValue = document.createElement('div');
  mineValue.className = 'mine-value';
  mineValue.innerText = '0';
  mineBlock.append(mineValue);

  const flagBlock = document.createElement('div');
  flagBlock.className = 'flag-block';
  stats.append(flagBlock);

  const flagLabel = document.createElement('div');
  flagLabel.className = 'flag-label';
  flagLabel.innerText = 'FLAGS';
  flagBlock.append(flagLabel);

  const flagValue = document.createElement('div');
  flagValue.className = 'flag-value';
  flagValue.innerText = '0';
  flagBlock.append(flagValue);

  const timeBlock = document.createElement('div');
  timeBlock.className = 'time-block';
  stats.append(timeBlock);

  const timeLabel = document.createElement('div');
  timeLabel.className = 'time-label';
  timeLabel.innerText = 'TIME';
  timeBlock.append(timeLabel);

  const timeValue = document.createElement('div');
  timeValue.className = 'time-value';
  timeValue.innerText = '0';
  timeBlock.append(timeValue);

  const stepBlock = document.createElement('div');
  stepBlock.className = 'step-block';
  stats.append(stepBlock);

  const stepLabel = document.createElement('div');
  stepLabel.className = 'step-label';
  stepLabel.innerText = 'STEPS';
  stepBlock.append(stepLabel);

  const stepValue = document.createElement('div');
  stepValue.className = 'step-value';
  stepValue.innerText = '0';
  stepBlock.append(stepValue);

  const message = document.createElement('div');
  message.className = 'message';
  message.innerText = 'Choose the field size and set the mine quantity';
  info.append(message);
}
