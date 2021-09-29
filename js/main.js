'use strict'; // установка означающая что код обрабатывается в строгом режиме

// всегда использовать const если не получается тогда уже let 
// (менять тип переменных не нужно значит const)
const input = document.querySelector(".input-field-container input");
const addBtn = document.querySelector(".input-field-container button");
const todoList = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".footer button");

let listArray = [];

// использую function expression для лучшей читаемости кода
showTasksList();

// добавляю через addEventListener так как обработчик через
// elem.onclick нельзя снять (если понадобится удаление конкретной части elem.onclick  
// возможна будет только полная перезапись всего onclick)

input.addEventListener('keyup', onInputKeyup);
input.addEventListener('keydown', onInputKeydown);

addBtn.addEventListener('click', addNewItem);
// Функция deleteTask добавляется через onclick в 
// шаблонной строке у функции showTaskList
deleteAllBtn.addEventListener('click', onDeleteAllBtnClick);

// использую function expression для лучшей читаемости кода
function showTasksList() {

  // получаю данные из уже имеющегося localStorage
  let getLocalStorageData = localStorage.getItem("Todo list");

  if ( getLocalStorageData == null ) {
    listArray = [];
  } else {
    // Так как данные в localStorage хранятся в стоках их нужно парсить
    listArray = JSON.parse(getLocalStorageData); 
  }

  const tasksCount = document.querySelector(".tasks-count");
  tasksCount.textContent = listArray.length;

  // делает кнопку для удаления всех элементов неактивной если массив пуст
  if ( listArray.length > 0 ) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }

  let newList = "";

  listArray.forEach((element, index) => {
    // чтобы не перерисовывать DOM дерево на кажую итеррацию цикла
    // следует добавить все элементы в одну строку и после отрисовать его 1 раз
    newList += `
      <li>
        <span class="list-item-text">${element}</span>
        <button class="delete-item-btn" onclick="deleteTask(${index})">
           <span class="trash-icon"></span>
        </button>
      </li>`;
  });

  todoList.innerHTML = newList;
  input.value = "";

}

function deleteTask(index) {

  let getLocalStorageData = localStorage.getItem("Todo list");

  listArray = JSON.parse(getLocalStorageData);
  // метод массива splice удаляет элемент и не оставляет на его месте undefined
  // (в данном случае образно сдвигает массив на 1 элемент начиная с index в лево после удаления)

  listArray.splice(index, 1); 
  // переводит массив в строковый вид JSON.stringify для добавления в localStorage
  // и вызывает функцию showTasksList для перерисовки списка todo-шника
  localStorage.setItem("Todo list", JSON.stringify(listArray));
  showTasksList(); 

}

function onInputKeydown(e) {
  // номер enter на клавиатуре точно равен === 13
  if (e.keyCode === 13) {
    addNewItem();
  }
}

function onInputKeyup() {

  let inputValue = input.value; 

  if (inputValue.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }

}

function addNewItem() {

  let inputValue = input.value;
  let getLocalStorageData = localStorage.getItem("Todo list");

  if ( getLocalStorageData == null ) { 
    listArray = []; 
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }

  listArray.push(inputValue); 
  localStorage.setItem("Todo list", JSON.stringify(listArray)); 
  showTasksList();
  addBtn.classList.remove("active"); 

}

function onDeleteAllBtnClick() {

  let getLocalStorageData = localStorage.getItem("Todo list");

  if ( getLocalStorageData == null ) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
    listArray = [];
  }

  localStorage.setItem("Todo list", JSON.stringify(listArray));
  showTasksList();

}
