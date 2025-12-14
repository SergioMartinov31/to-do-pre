
let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if (localStorage.getItem('tasks')){
		return JSON.parse(localStorage.getItem('tasks'));
	} else{
		return items;	
	}
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener('click', () => {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	})

	duplicateButton.addEventListener('click', () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem)
		items = getTasksFromDOM();
		saveTasks(items);
	})

	editButton.addEventListener('click', () => {
		textElement.contentEditable = true;
		textElement.focus();
	})

	textElement.addEventListener('blur', () => {
		textElement.contentEditable = false;
		items = getTasksFromDOM();
		saveTasks(items);
	})

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach((item) => {
		tasks.push(item.textContent);
	})

	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

formElement.addEventListener('submit', (event) => {
	event.preventDefault();
	listElement.prepend(createItem(inputElement.value));
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';

})


items = loadTasks()
items.forEach((item) => {
	listElement.append(createItem(item))
})



const footer = document.querySelector('footer');

function handleFooterClick() {
    footer.textContent = '<3';
    footer.style.color = '#a7435cff'; // Красивый розовый
    footer.style.fontSize = '24px';
    
    // Возвращаем обратно через 3 секунды
    setTimeout(() => {
        footer.textContent = '© Yandex.Praktikum 2025';
        footer.style.color = '#898989';
        footer.style.fontSize = '18px';
    }, 2000);
}

// Работает и на компьютере, и на телефоне
footer.addEventListener('click', handleFooterClick);
footer.addEventListener('touchstart', handleFooterClick);