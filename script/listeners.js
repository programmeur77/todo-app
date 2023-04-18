/**
 * @file Manage listeners added to HTML elements
 * @author Benoît PUECH
 * @date 18/04/2022 19:00
 */

import { submitBtn, text } from './app-classes.js';
import { deleteTask, isEmpty, postData } from './task-functions.js';
import { displayFormErrorMessage } from './task-view.js';

export function addListenerSubmitBtn() {
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const isNotEmpty = isEmpty(text);
    if (isNotEmpty) {
      postData(text.value);
      location.reload();
    } else {
      displayFormErrorMessage();
    }
  });
}

/**
 * Add listeners on each "Delete" button that were dynamicly created
 * @date 18/04/2023 - 17:52:14
 *
 * @export
 */
export function addListenerDeleteBtn() {
  const deleteBtn = document.querySelectorAll('.task-display__delete-item');

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', async (event) => {
      const currentId = event.target.parentElement.dataset.id;
      deleteTask(currentId);
    });
  }
}
