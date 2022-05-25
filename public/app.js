const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");


window.addEventListener('load', getAllTasks)


	form.addEventListener('submit', (e) => {
		// e.preventDefault()
		// console.log(e)
		createTask(e);

		// const task = input.value;

		// const task_el = document.createElement('div');
		// task_el.classList.add('task');

		// const task_content_el = document.createElement('div');
		// task_content_el.classList.add('content');

		// task_el.appendChild(task_content_el);

		// const task_input_el = document.createElement('input');
		// task_input_el.classList.add('text');
		// task_input_el.type = 'text';
		// task_input_el.value = task;
		// task_input_el.setAttribute('readonly', 'readonly');

		// task_content_el.appendChild(task_input_el);

		// const task_actions_el = document.createElement('div');
		// task_actions_el.classList.add('actions');
		
		// const task_edit_el = document.createElement('button');
		// task_edit_el.classList.add('edit');
		// task_edit_el.innerText = 'Edit';

		// const task_delete_el = document.createElement('button');
		// task_delete_el.classList.add('delete');
		// task_delete_el.innerText = 'Delete';

		// task_actions_el.appendChild(task_edit_el);
		// task_actions_el.appendChild(task_delete_el);

		// task_el.appendChild(task_actions_el);

		// list_el.appendChild(task_el);

		// input.value = '';

		// task_edit_el.addEventListener('click', (e) => {
		// 	if (task_edit_el.innerText.toLowerCase() == "edit") {
		// 		task_edit_el.innerText = "Save";
		// 		task_input_el.removeAttribute("readonly");
		// 		task_input_el.focus();
		// 	} else {
		// 		task_edit_el.innerText = "Edit";
		// 		task_input_el.setAttribute("readonly", "readonly");
		// 	}
		// });

		// task_delete_el.addEventListener('click', (e) => {
		// 	list_el.removeChild(task_el);
		// });
	});


async function createTask(e) {
	// e.preventDefault()
	const task = input.value;
	const jsonDate = new Date()
	
	let taskData = {
		task_content: task,
		due_date: jsonDate,
		completed: "false"
	};
console.log({taskData})

	const string = JSON.stringify(taskData)
	console.log({string})
	// $.post( "https://jjmac7777-mvp1.herokuapp.com/api/create", string, function( data, status ) {
	// 	console.log(`${data} and status is ${status}`,taskData);
	//   });

	const response = await fetch("https://jjmac7777-mvp1.herokuapp.com/api/create", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: string
	})
	const data = await response.json()
	console.log(data)
}

async function updateTasks() {
	task_edit_el.addEventListener('click', (e) => {
	console.log(e)
	})
	const updatedTask = input.value;
	const jsonDate = new Date()
	
	let updatedData = {
		task_content: updatedTask,
		due_date: jsonDate,
		completed: "false"
	};

	const string = JSON.stringify(updatedData)
	
	const response = await fetch(`https://jjmac7777-mvp1.herokuapp.com/api/update`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: string
	})
	const data = await response.json()
	console.log(data)
	
}
function getAllTasks() {
  
	$.get("https://jjmac7777-mvp1.herokuapp.com/api/tasks" , (data) => {
		
		for (let i = 0; i < data.length; i++) {
			const task = data[i].task_content;
			const id = data[i].id

		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');
		task_content_el.id = id

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_save_el = document.createElement('button');
		task_edit_el.classList.add('save');
		task_edit_el.innerText = 'Save';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		const task_complete_el = document.createElement('button');
		task_delete_el.classList.add('complete');
		task_delete_el.innerText = 'Completed';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_save_el);
		task_actions_el.appendChild(task_delete_el);
		task_actions_el.appendChild(task_complete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
				updateTasks()
				
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			
			list_el.removeChild(task_el);
		});
		}
		console.log(data)
		
  })
}
