import { isEmpty, isStored, postData } from './app-functions.js';

const text = document.querySelector('.app-form__description-field');
const submitBtn = document.querySelector('.app-form__post-data-btn');
const displaySection = document.querySelector('.task-display__section');
const formError = document.querySelector('.app-form__error');

const tasks = isStored();

if (!tasks) {
  displaySection.innerHTML =
    '<p class="task-display__error">No task ATM, please write one :)</p>';
} else {
  console.log('Comming soon');
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const isNotEmpty = isEmpty(text);
  if (isNotEmpty) {
    postData(text.value);
  } else {
    formError.innerText = 'Please fill out the field before submitting';
  }
});
