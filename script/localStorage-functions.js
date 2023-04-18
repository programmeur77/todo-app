/**
 * @file manages localStorage functions to get and post data in it
 * @author Benoît PUECH
 * @date 18/04/2023 18:55
 */

/**
 *  Checks if a localStorage entry is present or not
 * @returns {boolean} true if entry exists, false if does not
 */

export function isStored() {
  const tasks = localStorage.getItem('currentTasks');

  if (tasks == null) return false;
  else if (tasks == '[]') {
    localStorage.removeItem('currentTasks');
    location.reload();
  } else return true;
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
