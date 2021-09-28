'use strict';
const input = document.querySelector(".input-field-container input");
const addBtn = document.querySelector(".input-field-container button");
const todoList = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".footer button");
let listArray = [];

showTasksList();

function showTasksList() {

  let getLocalStorageData = localStorage.getItem("Todo list");

  if ( getLocalStorageData == null ) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData); 
  }

  const pendingTasksNumb = document.querySelector(".tasks-count");
  pendingTasksNumb.textContent = listArray.length;

  if ( listArray.length > 0 ) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }

  let newLiTag = "";

  listArray.forEach((element, index) => {
    newLiTag += `
      <li>
        <span class="list-item-text">${element}</span>
        <button class="delete-item-btn" onclick="deleteTask(${index})">
           <span class="trash-icon"></span>
        </button>
      </li>`;
  });

  todoList.innerHTML = newLiTag;
  input.value = "";

}

function deleteTask(index) {

  let getLocalStorageData = localStorage.getItem("Todo list");

  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("Todo list", JSON.stringify(listArray));
  showTasksList(); 

}

const onInputKeyup = () => {

  let userEnteredValue = input.value; 

  if (userEnteredValue.trim() != 0){
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }

}

input.addEventListener('keyup', onInputKeyup);

const onAddBtnclick = () => {

  let userEnteredValue = input.value;
  let getLocalStorageData = localStorage.getItem("Todo list");

  if ( getLocalStorageData == null ) { 
    listArray = []; 
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }

  listArray.push(userEnteredValue); 
  localStorage.setItem("Todo list", JSON.stringify(listArray)); 
  showTasksList();
  addBtn.classList.remove("active"); 

}

addBtn.addEventListener('click', onAddBtnclick);

const onDeleteAllBtnClick = () => {

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

deleteAllBtn.addEventListener('click', onDeleteAllBtnClick);