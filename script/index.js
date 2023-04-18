import { submitBtn } from './app-classes.js';
import { getTasks, isEmpty, isStored, postData } from './app-functions.js';
import {
  displayData,
  displayFormErrorMessage,
  noDataToDisplay,
} from './task-view.js';

const text = document.querySelector('.app-form__description-field');

const tasks = isStored();

if (!tasks) {
  noDataToDisplay();
} else {
  const storedTasks = getTasks();
  displayData(storedTasks);
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const isNotEmpty = isEmpty(text);
  if (isNotEmpty) {
    postData(text.value);
    location.reload();
  } else {
    displayFormErrorMessage;
  }
});
