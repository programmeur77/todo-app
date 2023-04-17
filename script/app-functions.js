export async function getTasks() {
  const data = await fetch('../data/tasks.json');
  const tasks = await data.json();

  return tasks;
}
