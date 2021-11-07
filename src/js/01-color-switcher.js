function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let intervalId = null;

function onStartBtnClick() {
  intervalId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    isActive = true;
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}
