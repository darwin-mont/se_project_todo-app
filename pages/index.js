import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../componets/Todo.js";
import FormValidator from "../componets/FormValidator.js";
import Section from "../componets/Section.js";
import PopupWithForm from "../componets/PopupWithForm.js";
import TodoCounter from "../componets/TodoCounter.js";

const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const addTodoButton = document.querySelector(".button_action_add");
const todosList = document.querySelector(".todos__list");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

//Generate Todo function
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

//Initialize Section
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoEl = generateTodo(item);
    todosList.append(todoEl);
    return todoEl;
  },
  containerSelector: ".todos__list",
});

//Initialize Popup

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues, evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;
    todoCounter.updateTotal(true); // Update the total count of todos
    //validate inputs
    if (!name) return;

    const newTodo = {
      name: inputValues.name || "new todo",
      date: inputValues.date || "null",
      id: uuidv4(),
      completed: false,
    };

    if (dateInput) {
      const date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      newTodo.date = date.toISOString();
    }

    section.addItem(newTodo);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateTotal(false);
  }
}

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
  newTodoValidator.resetValidation();
});

///////// ADDING A NEW TODO /////////

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

section.renderItems();

newTodoValidator.enableValidation();
