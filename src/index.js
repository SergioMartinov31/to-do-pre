import './normalize.css';
import './fonts/inter.css';
import './blocks/body/body.css';
import './blocks/main/main.css';

import './blocks/to-do/to-do.css';
import './blocks/to-do/__title/to-do__title.css';
import './blocks/to-do/__form/to-do__form.css';
import './blocks/to-do/__input/to-do__input.css';
import './blocks/to-do/__submit/to-do__submit.css';
import './blocks/to-do/__list/to-do__list.css';
import './blocks/to-do/__item/to-do__item.css';
import './blocks/to-do/__item-text/to-do__item-text.css';
import './blocks/to-do/__item-button/to-do__item-button.css';
import './blocks/to-do/__item-button/_type/to-do__item-button_type_delete.css';
import './blocks/to-do/__item-button/_type/to-do__item-button_type_duplicate.css';
import './blocks/to-do/__item-button/_type/to-do__item-button_type_edit.css';

import './blocks/footer/footer.css';

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