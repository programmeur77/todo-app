import { addListenerSubmitBtn } from './listeners.js';
import { getTasks, isStored } from './localStorage-functions.js';
import { displayData, noDataToDisplay } from './task-view.js';

const tasks = isStored();

if (!tasks) {
  noDataToDisplay();
} else {
  const storedTasks = getTasks();
  displayData(storedTasks);
}

addListenerSubmitBtn();
