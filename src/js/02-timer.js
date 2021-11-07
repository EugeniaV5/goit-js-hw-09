import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

const refs = {
  inputEl: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button'),
  dayEl: document.querySelector('.value[data-days]'),
  hourEl: document.querySelector('.value[data-hours]'),
  minuteEL: document.querySelector('.value[data-minutes]'),
  secondEl: document.querySelector('.value[data-seconds]'),
  selectedDate: null,
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const timeDiff = selectedDates[0].getTime() < Date.now();
    if (timeDiff) {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
    refs.selectedDate = selectedDates;
  },
};

flatpickr('input#datetime-picker', options);

function onStartClick() {
  const timerId = setInterval(() => {
    refs.startBtn.disabled = true;
    const currentTime = Date.now();
    const targetTime = refs.selectedDate[0].getTime();
    const deltaTime = targetTime - currentTime;
    const timeComponents = convertMs(deltaTime);
    updateClockface(timeComponents);
    if (deltaTime <= 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.dayEl.textContent = `${days}`;
  refs.hourEl.textContent = `${hours}`;
  refs.minuteEL.textContent = `${minutes}`;
  refs.secondEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
