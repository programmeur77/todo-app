export class Task {
  constructor(id, task) {
    this.id = id;
    this.task = task;
  }
}

export const list = document.querySelector('.task-display__list');
export const displaySection = document.querySelector('.task-display__section');
export const formError = document.querySelector('.app-form__error');
export const submitBtn = document.querySelector('.app-form__post-data-btn');
