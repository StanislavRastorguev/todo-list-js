const newTask = document.getElementById('addNewTask');
const list = document.getElementById('list');
const message = document.getElementById('message');
const taskName = document.getElementsByName('forCheck');
let tasks = [];

let taskData = localStorage['todoList'];

let checkBoxStatus = (index) => {	
	if (tasks[index].status === false) {
		taskName[index].className = 'done'
		tasks[index].status = !tasks[index].status;
		localStorage['todoList'] = JSON.stringify(tasks);
	} else {
		taskName[index].className = ''
		tasks[index].status = !tasks[index].status;
		localStorage['todoList'] = JSON.stringify(tasks);
	}
}

let taskNameEdit = (index) => {
	message.innerHTML = "After changing the name, press Enter";
	taskName[index].setAttribute("contenteditable", "true");
}

let taskNameEdited = (index, oldTaskName) => {
	if (event.which === 13) {
		let newTaskName = event.target.innerHTML;
		if (newTaskName === '') {
			message.innerHTML = "You can't add task without name";
			newTaskName = oldTaskName;
			taskName[index].setAttribute("contenteditable", "false");
		} else {
			tasks[index].taskName = newTaskName;
			message.innerHTML = "";
			taskName[index].setAttribute("contenteditable", "false");
			localStorage['todoList'] = JSON.stringify(tasks);
		}
	}
}

let removeTask = (taskIndex) => {
	let liForRemove = document.getElementsByTagName('li');
	for (let i = liForRemove.length-1; i >= 0 ; i--) {
		liForRemove[i].remove();
	}
	tasks.splice(taskIndex, 1);
	localStorage['todoList'] = JSON.stringify(tasks);
	for (let task in tasks) {
		let taskForOutput = tasks[task];
		let taskIndex = task;
		output(taskForOutput, taskIndex);
	}
}

let output = (taskData, taskIndex) => {
	let item = document.createElement('li');
	let chb = document.createElement('input');
	let spanForTask = document.createElement('span');
	let spanForDelete = document.createElement('span');
	let txt = document.createTextNode('\u00D7');
	chb.type = 'checkbox';
	spanForTask.setAttribute("contenteditable", "false");
	spanForTask.setAttribute("name", "forCheck");
	if (taskData.status === true) {
		chb.setAttribute("checked", "checked");
		spanForTask.className = 'done';
	}
	spanForTask.innerHTML = taskData.taskName;
	
	chb.onclick = checkBoxStatus.bind(this, taskIndex);
	spanForTask.ondblclick = taskNameEdit.bind(this, taskIndex);
	spanForTask.onkeydown = taskNameEdited.bind(this, taskIndex, newTask.value);
	spanForDelete.onclick = removeTask.bind(this, taskIndex);
	
	item.appendChild(chb);
	item.appendChild(spanForTask);
	spanForDelete.appendChild(txt);
	item.appendChild(spanForDelete);
	list.appendChild(item);
	
	localStorage['todoList'] = JSON.stringify(tasks);
	
}

if (taskData !== undefined) {
	tasks = JSON.parse(taskData);
	for (let task in tasks) {
		let taskForOutput = tasks[task];
		let taskIndex = task;
		output(taskForOutput, taskIndex);
	}
}

newTask.onkeydown = () => {
	if (event.which === 13 && newTask.value === "") {
		message.innerHTML = "You can't add task without name";
	}
	if (event.which === 13 && newTask.value !== "") {
		message.innerHTML = '';
		
		let newTaskData = {'taskName': newTask.value, 'status': false};
		tasks.push(newTaskData);
		newTask.value = "";
		output(newTaskData, tasks.length-1);
	}
}