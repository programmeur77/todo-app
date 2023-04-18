import { Task } from './app-classes.js';

export function isStored() {
  const tasks = localStorage.getItem('currentTasks');

  if (tasks == null) return false;
  else return true;
}

export function getTasks() {
  const storedTasks = localStorage.getItem('currentTasks');
  const allTasks = JSON.parse(storedTasks);

  return allTasks;
}

export function isEmpty(fieldToCheck) {
  if (fieldToCheck.value == '') return false;
  else return true;
}

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

function createNewTask(isStored, taskId, taskContent) {
  let newTask = new Task(taskId, taskContent);
  if (!isStored) {
    newTask = [new Task(taskId, taskContent)];
  }

  return newTask;
}

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

function addTask(taskToAdd) {
  let actualTasks = getTasks();
  actualTasks = [...actualTasks, taskToAdd];

  localStorage.setItem('currentTasks', JSON.stringify(actualTasks));
}
