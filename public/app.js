const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");
const completed_list_el = document.querySelector("#completed_tasks");

window.addEventListener("load", getAllTasks);

form.addEventListener("submit", (e) => {
  createTask(e);
});

async function createTask(e) {
  const task = input.value;
  const jsonDate = new Date();

  let taskData = {
    task_content: task,
    due_date: jsonDate,
    completed: "false",
  };
  console.log({ taskData });

  const string = JSON.stringify(taskData);
  console.log({ string });

  const response = await fetch(
    "https://jjmac7777-mvp1.herokuapp.com/api/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: string,
    }
  );
  const data = await response.json();
  console.log(data);
}

async function updateTasks(inputID, id, currStat) {
  console.log(inputID, id, currStat);
  const input = document.getElementById(`${inputID}`);
  const updatedTask = input.value;
  const jsonDate = new Date();
  console.log(updatedTask);
  let updatedData = {
    task_content: updatedTask,
    due_date: jsonDate,
    completed: `${currStat}`,
  };

  const string = JSON.stringify(updatedData);
  console.log(string);

  const response = await fetch(
    `https://jjmac7777-mvp1.herokuapp.com/api/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: string,
    }
  );
  const data = await response.json();
  console.log(data);

  if (currStat === "true") {
    task_complete_el.style.color = "green";
    completed_list_el.appendChild(task_el);
  }
}

async function deleteTask(inputID, id) {
  console.log(inputID, id);
  const input = document.getElementById(`${inputID}`);
  const task = input.value;
  const response = await fetch(
    `https://jjmac7777-mvp1.herokuapp.com/api/delete/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  console.log(data);
}

async function getAllTasks() {
  await $.get("https://jjmac7777-mvp1.herokuapp.com/api/tasks", (data) => {
    for (let i = 0; i < data.length; i++) {
      const task = data[i].task_content;
      const id = data[i].id;

      const task_el = document.createElement("div");
      task_el.classList.add("task");

      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");
      task_el.appendChild(task_content_el);

      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = task;
      task_input_el.id = `task${id}`;
      const inputID = task_input_el.id;
      task_input_el.setAttribute("readonly", "readonly");

      task_content_el.appendChild(task_input_el);

      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");

      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerText = "Edit";

      const task_save_el = document.createElement("button");
      task_save_el.classList.add("save");
      task_save_el.innerText = "Save";
      const task_delete_el = document.createElement("button");
      const completed_task_delete_el = document.createElement("button");

      if (!data[i].completed) {
        task_delete_el.classList.add("delete");
        task_delete_el.innerText = "Delete";
      } else {
        completed_task_delete_el.classList.add("delete");
        completed_task_delete_el.innerText = "Delete";
      }

      const task_complete_el = document.createElement("button");
      task_complete_el.classList.add("complete");
      task_complete_el.innerText = "Completed";

      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_save_el);
      task_actions_el.appendChild(task_delete_el);
      task_actions_el.appendChild(completed_task_delete_el);
      task_actions_el.appendChild(task_complete_el);

      task_el.appendChild(task_actions_el);
      console.log(data[i].completed);
      if (!data[i].completed) {
        list_el.appendChild(task_el);
      } else {
        task_complete_el.style.color = "green";
        completed_list_el.appendChild(task_el);
      }

      task_edit_el.addEventListener("click", (e) => {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
      });

      completed_task_delete_el.addEventListener("click", (e) => {
        deleteTask(inputID, id);
        completed_list_el.removeChild(task_el);
      });
      task_delete_el.addEventListener("click", (e) => {
        deleteTask(inputID, id);
        list_el.removeChild(task_el);
      });
      task_save_el.addEventListener("click", (e) => {
        let currentStatus = data[i].completed;
        updateTasks(inputID, id, currentStatus);
        task_input_el.setAttribute("readonly", "readonly");
      });
      task_complete_el.addEventListener("click", (e) => {
        task_complete_el.style.color = "green";
        data[i].completed = "true";
        currentStatus = data[i].completed;
        console.log(currentStatus);
        updateTasks(inputID, id, currentStatus);
        location.reload();
      });
    }
    console.log(data);
  });
}

// ticker API
ticker();
function ticker() {
  const ticker_el = document.getElementById("hwrap");
  const moveDiv = document.createElement("div");
  moveDiv.classList.add("hmove");
  ticker_el.appendChild(moveDiv);
  $.get(
    "https://jjmac7777-mvp1.herokuapp.com/api/news",
    (data) => {
      console.log(data);
      for (let i = 0; i < 10; i++) {
        const tempDiv = document.createElement("div");
        tempDiv.classList.add("hitem");
        moveDiv.appendChild(tempDiv);
        tempDiv.innerHTML = data.articles[i].title;
      }
    }
  );
}

// create Time Date Container
const container = document.getElementById("container");
const currentInfo = document.createElement("current-info");
currentInfo.classList.add("current-info");
container.appendChild(currentInfo);

const currentContainer = document.createElement("current-container");
currentContainer.classList.add("current-container");
currentInfo.appendChild(currentContainer);

const dateContainer = document.createElement("date-container");
dateContainer.classList.add("date-container");
currentInfo.appendChild(dateContainer);

const date = document.createElement("div");
date.classList.add("date");
date.id = "date";
date.textContent = "Thursday, 28 April";
dateContainer.appendChild(date);

let cdate = moment().format("dddd, MMMM Do YYYY");
let now = moment().format("h:mm a");
let dateandtime =
  (dateContainer.innerHTML = `${cdate}<br/>Current time: ${now}`);
