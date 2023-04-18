/**
 * @file Manages the task post and display
 * @author Benoît Puech
 */

import { Task } from './app-classes.js';

/**
 * Checks if a localStorage entry is present or not
 * @returns {boolean} true if there is a localStorage entry, false if not
 */

export function isStored() {
  const tasks = localStorage.getItem('currentTasks');

  if (tasks == null) return false;
  else return true;
}

/**
 * Get contents from localStorage and returns it
 * @returns localStorage parsed content
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
 * @param {*} dataToPost From input text field from the form
 */
export function postData(dataToPost) {
  let id = 0;
  const stored = isStored();

  if (!stored) {
    let id = 1;
    const taskToStore = createNewTask(stored, id, dataToPost);
    localStorage.setItem('currentTasks', JSON.stringify(taskToStore));
  } else {
    const storedTask = getTasks();
    const lastId = getLastTaskId(storedTask);
    id = lastId + 1;
    const taskToAdd = createNewTask(stored, id, dataToPost);
    addTask(taskToAdd);
  }
}

/**
 * Creates a new task according to Task class constructor according to presence or not of localStorage entry
 * @date 18/04/2023 - 13:53:04
 *
 * @param {boolean} isStored
 * @param {number} taskId
 * @param {string} taskContent
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
 * @param {*} taskArray
 * @returns {number}
 */
function getLastTaskId(taskArray) {
  let lastTaskId = 0;
  const objectValues = Object.values(taskArray);
  const lastStoredTask = objectValues.filter((taskId) => {
    return taskId.id == objectValues.length;
  });

  lastStoredTask.forEach((task) => {
    lastTaskId = task.id;
  });

  return lastTaskId;
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
