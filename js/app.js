
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.menu');

const handleClick = (hamburger, nav) => {
  hamburger.classList.toggle('hamburger--active');
  nav.classList.toggle('menu--active');
}

hamburger.addEventListener('click', () => handleClick(hamburger, nav) );

const addBtn = document.querySelector('.btn-add');
const addForm = document.querySelector('.new-form');

addBtn.addEventListener('click', () => handleClick(addBtn, addForm) );



//Marking up done tasks
const doneTasks = document.getElementsByClassName("done");

const doneCheck = document.createElement('div');
doneCheck.classList += "done__check";
doneCheck.innerHTML += "<i class='far fa-check-circle fa-7x'></i>";

for (let item of doneTasks) {
  let newChild = doneCheck.cloneNode(true);
  item.append(newChild);
}

//Setting up time

function lz(i) {
  return `${i}`.padStart(2, "0");
}

const elDate = document.querySelectorAll(".datebox__date")[0];
const elTime = document.querySelectorAll(".datebox__time")[0];

function showTextTime() {
  const now = new Date();

  const textDate = `${lz(now.getDate())}.${lz((now.getMonth()+1))}.${now.getFullYear()}`;
  const textTime = `${lz(now.getHours())}:${lz(now.getMinutes())}`;
  elDate.innerHTML = textDate;
  elTime.innerHTML = textTime;

  window.requestAnimationFrame(showTextTime);
}

window.requestAnimationFrame(showTextTime);

const popupText = document.querySelector(".popup__text");
const popupBtnYes = document.querySelector(".menu__btn.btn--yes");
const popupBtnNo = document.querySelector(".menu__btn.btn--no");
const popupBox = document.querySelector(".popup__box");
popupBtnNo.addEventListener('click', ()=>{
  togglePopup(popupBox);
});
//popupBtnYes.addEventListener('click', ()=>{
  //togglePopup(popupBox);
//});

function showPopup(text, el) {

  togglePopup(popupBox);
  console.log(el);
  popupBtnYes.addEventListener('click', el.deleteTask);

  popupText.innerHTML = text;
}

function togglePopup(element) {
  element.classList.toggle("popup__box--active");
}


class Task {
  constructor(title, description, time, date, priority, category, status){
    this.title = title;
    this.description = description;
    
    this.time = time;
    this.date = date;

    this.priority = priority;
    this.category = category;

    this.isDone = status;
  }

  editTask(){

  }
  deleteTask(){
    console.log("usunięto");
  }
  deleteTaskQuestion(){
    showPopup("Czy na pewno chcesz usunąć?", this);
    this.deleteTask;
  }
  createTask() {

    const taskContainer = document.createElement('div');
    taskContainer.classList += "task__card " + this.priority;

    const taskInfo = document.createElement('div');
    taskInfo.classList += "task__info";
    taskContainer.append(taskInfo);

    const taskCategory = document.createElement('div');
    taskCategory.classList += "task__category";
    taskCategory.innerHTML = this.category;
    taskInfo.append(taskCategory);

    const taskContent = document.createElement('section');
    taskContent.classList += "task__content";
    taskContainer.append(taskContent);

    const taskTime = document.createElement('div');
    taskTime.classList += "task__time";
    taskTime.innerHTML = this.time;
    taskContent.append(taskTime);

    const taskName = document.createElement('h3');
    taskName.classList += "task__name";
    taskName.innerHTML = this.title;
    taskContent.append(taskName);

    const taskDesc = document.createElement('p');
    taskDesc.classList += "task__desc";
    taskDesc.innerHTML = this.description;
    taskContent.append(taskDesc);

    const taskTools = document.createElement('div');
    taskTools.classList += "task__tools";
    taskContainer.append(taskTools);

    const taskEdit = document.createElement('div');
    taskEdit.classList += "tools__edit";
    taskTools.append(taskEdit);

    const taskShowToolsBtn = document.createElement('button');
    taskShowToolsBtn.classList += "tool show-tools fas fa-angle-right fa-2x fa-rotate-180";
    taskShowToolsBtn.addEventListener('click', (e) => e.target.parentNode.classList.toggle("edit--active"));
    taskEdit.append(taskShowToolsBtn);

    const taskEditBtn = document.createElement('button');
    taskEditBtn.classList += "tool btn-edit fas fa-edit fa-2x";
    taskEditBtn.addEventListener('click', this.editTask);
    taskEdit.append(taskEditBtn);

    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.classList += "tool btn-delete fas fa-trash fa-2x";
    taskDeleteBtn.addEventListener('click', this.deleteTaskQuestion);
    taskEdit.append(taskDeleteBtn);

    const taskCheck = document.createElement('div');
    taskCheck.classList += "tools__check";
    taskTools.append(taskCheck);

    const taskCheckBtn = document.createElement('button');
    taskCheckBtn.classList += "tool btn-check fas fa-clipboard-check fa-2x";
    taskCheckBtn.addEventListener('click', this.checkTask);
    taskCheck.append(taskCheckBtn);

    const main = document.getElementsByClassName("active-tasks")[0];
    main.append(taskContainer);
  };
}

const task1 = new Task("Zrobić pranie", "60 stopni wirowanie", "10:00", "10/06/2020", "normal", "house", false);
const task2 = new Task("Zrobić pranie", "60 stopni wirowanie", "10:00", "10/06/2020", "normal", "house", false);

task2.createTask();

const elem = document.querySelector('#newTask--date');
const datepicker = new Datepicker(elem);

localStorage.setItem("task1", JSON.stringify(task1));

const taskStorage = JSON.parse(localStorage.getItem("task1"));
const storageTask = new Task(taskStorage.title, taskStorage.description, taskStorage.time, taskStorage.date, taskStorage.priority, taskStorage.category, taskStorage.isDone);
console.log(storageTask);
storageTask.createTask();
