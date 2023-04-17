import { getTasks } from './app-functions.js';

const text = document.querySelector('.app-form__description-field');
const submitBtn = document.querySelector('.app-form__post-data-btn');
const displaySection = document.querySelector('.task-display__section');

const tasks = getTasks().then((currentTasks) => {
  if (currentTasks.length <= 0) {
    displaySection.innerHTML = `<p class="task-display__error">No task for the moment. Create one :)</p>`;
  } else {
    console.log(currentTasks);
  }
});
