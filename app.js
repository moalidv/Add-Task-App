const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");

document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

const addTask = () => {
  if (!taskInput.value) return;
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.id = "task-item";
  taskItem.innerHTML = `
    <span>${taskInput.value}</span>
    <i class="fa-solid fa-trash-can delete"></i>
  `;
  taskList.appendChild(taskItem);
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = "";
};

const storeTaskInLocalStorage = (task) => {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.id = "task-item";
    taskItem.innerHTML = `
      <span>${task}</span>
      <i class="fa-solid fa-trash-can delete"></i>
    `;
    taskList.appendChild(taskItem);
  });
}

const deleteTask = (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteTaskFromLocalStorage(e.target.parentElement);
  }
};

function deleteTaskFromLocalStorage(element) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (element.children[0].textContent == task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", addTask);

// delete task
taskList.addEventListener("click", deleteTask);
