import { Task } from './app-classes.js';

export function getTasks() {
  const tasks = localStorage.getItem('currentTasks');

  if (tasks == null) return false;
  else return true;
}

export function isEmpty(fieldToCheck) {
  if (fieldToCheck.value == '') return false;
  else return true;
}

export function postData(dataToPost) {
  const tasks = getTasks();
  let id = 0;

  if (!tasks) {
    id = 1;
    const taskToPost = createNewTask(id, dataToPost);
    localStorage.setItem('currentTasks', JSON.stringify(taskToPost));
  } else {
    const allTasks = JSON.parse(tasks);
    const lastElement = allTasks.slice(-1);
    lastElement.forEach((element) => {
      id = element.id + 1;
      console.log(id);
      // TODO send to function that takes array out from  localStorage, push the data in the array and store it back
    });
  }
}

function createNewTask(taskId, taskContent) {
  let newTask = new Task(taskId, taskContent);

  return newTask;
}
