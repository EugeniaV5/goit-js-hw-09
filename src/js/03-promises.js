import Notiflix from 'notiflix';

const refs = {
  delayInputEl: document.querySelector('input[name="delay"]'),
  stepInputEl: document.querySelector('input[name="step"]'),
  amountInputEl: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button'),
};

refs.submitBtn.addEventListener('click', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();

  let delay = Number(refs.delayInputEl.value);
  let step = Number(refs.stepInputEl.value);
  let amount = Number(refs.amountInputEl.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
