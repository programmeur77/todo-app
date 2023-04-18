/**
 * @file Manages the task post and display
 * @author Benoît Puech
 */

import { Task } from './app-classes.js';

/**
 *  Checks if a localStorage entry is present or not
 * @returns {boolean} true if entry exists, false if does not
 */

export function isStored() {
  const tasks = localStorage.getItem('currentTasks');

  if (tasks == null) return false;
  else return true;
}

/**
 * Gets data from localStorage and parse it in JSON format
 * @date 18/04/2023 - 17:58:13
 *
 * @export
 * @returns {Object} array of object containing all stored tasks
 */
export function getTasks() {
  const storedTasks = localStorage.getItem('currentTasks');
  const allTasks = JSON.parse(storedTasks);

  return allTasks;
}

/**
 * Checks if the form is empty or not
 * @date 18/04/2023 - 13:49:26
 *
 * @export
 * @param {*} fieldToCheck is the form field which is checked empty or not
 * @returns {boolean}
 */
export function isEmpty(fieldToCheck) {
  if (fieldToCheck.value == '') return false;
  else return true;
}

/**
 * Give an id to the new task according to existing ones, send it to createNewTask() function and to addTask()
 * @date 18/04/2023 - 13:50:38
 *
 * @export
 * @param {string} dataToPost from input text field from the form
 */
export function postData(dataToPost) {
  const stored = isStored();

  if (!stored) {
    let id = 1;
    const taskToStore = createNewTask(stored, id, dataToPost);
    localStorage.setItem('currentTasks', JSON.stringify(taskToStore));
  } else {
    const storedTask = getTasks();
    id = getLastTaskId(storedTask);
    const taskToAdd = createNewTask(stored, newId, dataToPost);
    addTask(taskToAdd);
  }
}

/**
 * Creates a new task according to Task class constructor according to presence or not of localStorage entry
 * @date 18/04/2023 - 13:53:04
 *
 * @param {boolean} isStored localStorage already exists if true, doesn't if false
 * @param {number} taskId task ID number to store
 * @param {string} taskContent task content to store
 * @returns {object} Containing the new task according to the Task Class constructor
 */
function createNewTask(isStored, taskId, taskContent) {
  let newTask = new Task(taskId, taskContent);
  if (!isStored) {
    newTask = [new Task(taskId, taskContent)];
  }

  return newTask;
}

/**
 * This function gets last task id number got in the task array taken from localStorage
 * @date 18/04/2023 - 13:55:10
 *
 * @param {Array} taskArray array of all the stored tasks
 * @returns {number} new ID number
 */
function getLastTaskId(taskArray) {
  const lastTask = taskArray.pop();
  return lastTask.id + 1;
}

/**
 * Gets localStorage content and add the new task at the end of the array
 * @date 18/04/2023 - 13:56:21
 *
 * @param {*} taskToAdd contains the Task object
 */
function addTask(taskToAdd) {
  let actualTasks = getTasks();
  actualTasks = [...actualTasks, taskToAdd];

  localStorage.setItem('currentTasks', JSON.stringify(actualTasks));
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

/**
 * Delete a task in the storage array and re-set the updated task array in the storage
 * @date 18/04/2023 - 17:53:03
 *
 * @param {number} taskId ID number of task to delete
 */
function deleteTask(taskId) {
  const allTasks = getTasks();

  for (let i = allTasks.length - 1; i >= 0; i--) {
    if (allTasks[i].id == taskId) {
      allTasks.splice(i, 1);
    }
  }
  const TasksUpdated = allTasks;
  localStorage.setItem('currentTasks', JSON.stringify(TasksUpdated));
  location.reload();
}
