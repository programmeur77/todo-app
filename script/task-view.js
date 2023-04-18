/**
 * @file Contains all functions to display the tasks
 * @author Benoît PUECH
 * @date 18/04/2022 - 14:13
 */

import { displaySection, formError, list } from './app-classes.js';
import { addListenerDeleteBtn } from './app-functions.js';

export function displayFormErrorMessage() {
  formError.innerText = 'Please fill out the field before submitting';
}

export function noDataToDisplay() {
  displaySection.innerHTML =
    '<p class="task-display__error">No task ATM, please write one :)</p>';
}

export function displayData(dataToDisplay) {
  dataToDisplay.forEach((data) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-display__list-item';
    listItem.dataset.id = data.id;

    listItem.innerText = data.task;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-display__delete-item';
    deleteBtn.textContent = 'Remove';

    list.appendChild(listItem);
    listItem.appendChild(deleteBtn);
  });

  addListenerDeleteBtn();
}
