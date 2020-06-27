//HAMBURGER 

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.menu');

const handleClick = (hamburger, nav) => {
  hamburger.classList.toggle('hamburger--active');
  nav.classList.toggle('menu--active');
}

hamburger.addEventListener('click', () => handleClick(hamburger, nav) );

const addBtn = document.querySelector('.btn-add');
const addForm = document.querySelector('.new-form');

addBtn.addEventListener('click', () => handleClick(addBtn, addForm));

//------------------------------------

//Menu listeners
  const menuAddTaskBtn = document.querySelector(".nav-item .add");
  menuAddTaskBtn.addEventListener('click', () => {
    handleClick(hamburger, nav)
    handleClick(addBtn, addForm);
    });
//-----------------
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

//------------------------------------

//Datepicker elements
const today = new Date();
const todayText = `${lz(today.getDate())}.${lz((today.getMonth()+1))}.${today.getFullYear()}`;

const newTaskDate = document.querySelector('#newTask--date');
const newTaskDatepicker = new Datepicker(newTaskDate);
newTaskDatepicker.setOptions({format: "dd.mm.yyyy"});
newTaskDatepicker.setOptions({minDate: todayText});

const filterDate = document.querySelector(".filter--date");
filterDate.value = todayText;
const filterDatepicker = new Datepicker(filterDate);
filterDatepicker.setOptions({
  format: "dd.mm.yyyy",
  todayHighlight: true,
  disableTouchKeyboard: true,
});
filterDate.addEventListener('change', ()=>filterByDate(filterDate.value));



//------------------------------------

//Time selection

  

//--------------


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

function deletePopup(text, el) {

  togglePopup(popupBox);
  console.log(el);
  popupBtnYes.addEventListener('click', ()=>{
    togglePopup(popupBox);
    deleteTask(el.id);
  });

  popupText.innerHTML = text;
}

function togglePopup(element) {
  element.classList.toggle("popup__box--active");
}

  //------------------------------------

  class Task {
    constructor(title, description, time, date){
      this.id = ++Task.counter;
      this.title = title;
      this.description = description;
      
      this.time = time;
      this.date = date;
    }

    priority = 'normal';
    category = 'other';
    isDone = false;

    setCategory(category){
        this.category = category;
    }
    setPriority(priority){
        this.priority = priority;
    }

    changeStatus(el){
        if(el.isDone == false)
            el.isDone = true;
        else
            el.isDone = false

        updateLocalStorage();
        markDoneTask();
    }
  
    editTask(el){
        console.log(el.id);
    }
    deleteTaskQuestion(el){
      deletePopup("Czy na pewno chcesz usunąć te zadanie?", el);
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
      taskEditBtn.addEventListener('click', ()=>this.editTask(this));
      taskEdit.append(taskEditBtn);
  
      const taskDeleteBtn = document.createElement('button');
      taskDeleteBtn.classList += "tool btn-delete fas fa-trash fa-2x";
      taskDeleteBtn.addEventListener('click', ()=>this.deleteTaskQuestion(this));
      taskEdit.append(taskDeleteBtn);
  
      const taskCheck = document.createElement('div');
      taskCheck.classList += "tools__check";
      taskCheck.addEventListener('click', ()=>this.changeStatus(this));
      taskTools.append(taskCheck);
  
      const taskCheckBtn = document.createElement('button');
      taskCheckBtn.classList += "tool btn-check fas fa-clipboard-check fa-2x";
      taskCheckBtn.addEventListener('click', this.checkTask);
      taskCheck.append(taskCheckBtn);
  
      let main;
  
      if(this.isDone == true){
        taskContainer.classList += " done";
        main = document.getElementsByClassName("done-tasks")[0];
      }else
        main = document.getElementsByClassName("active-tasks")[0];
  
      main.append(taskContainer);
    };
  }
Task.counter = 0;


let taskArr = [];

function loadTasks(){
    taskArr = [];
    const taskStorage = JSON.parse(localStorage.getItem("tasks"));
    
    if(taskStorage)
      createTaskObjects(taskStorage);
};
loadTasks();

function createTaskObjects(arr){
    for(let task of arr){
        let taskEl = new Task(task.title, task.description, task.time, task.date);
        taskEl.setCategory(task.category);
        taskEl.setPriority(task.priority);
        taskEl.isDone = task.isDone;
        taskArr.push(taskEl);
    }
    filterByDate(filterDate.value);
}

function loadTasksOnScreen(arr){
    const allTaskCards = document.querySelectorAll(".task__card");
    
    for(let el of allTaskCards){
        el.remove();
    }

    const newTaskArr = arr.sort((a, b)=>{
      let aSplit = a.time.split(":");
      let bSplit = b.time.split(":");

      if(aSplit[0] < bSplit[0])
        return -1;
      if(aSplit[0] > bSplit[0])
        return 1;

      if(aSplit[1]<bSplit[1])
        return -1;
      if(aSplit[1]>bSplit[1])
        return 1

      return 0;
    });

    newTaskArr.forEach((task)=>{
        task.createTask();
    });
    
    markDoneTask();
}

function deleteTask(taskID) {
    const newTaskArr = taskArr.filter((el)=>{
        return el.id != taskID;
    })
    taskArr = newTaskArr;
    updateLocalStorage();
}

function updateLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    loadTasks();
}


function addNewTask() {
    const title = document.getElementById("newTask--title").value;
    const description = document.getElementById("newTask--description").value.split("\n").join("<br>");
    const date = document.getElementById("newTask--date").value;
    const time = document.getElementById("newTask--time").value;
    const category = (document.querySelector(".category--radio:checked") != null) ? document.querySelector(".category--radio:checked").value : "other";
    const priority = document.querySelector("#newTask--priority").value;

    if(title=="" || date=="" || time==""){
        alert("Wypełnij wymagane pola!");
        return 0;
    }
    if(category==null){
      category = "other";
    }
    const task = new Task(title, description, time, date);
    task.setCategory(category);
    task.setPriority(priority);
    
    taskArr.push(task);
    updateLocalStorage();
}

const addNewTaskBtn = document.querySelector(".addTask--submit");
addNewTaskBtn.addEventListener('click', ()=>{
  addNewTask();
  handleClick(addBtn, addForm);
});

//Marking up done tasks

function markDoneTask(){
  const doneTasks = document.getElementsByClassName("done");
  
  const doneCheck = document.createElement('div');
  doneCheck.classList += "done__check";
  doneCheck.innerHTML += "<i class='far fa-check-circle fa-7x'></i>";
  
  for (let item of doneTasks) {
    let newChild = doneCheck.cloneNode(true);
    item.append(newChild);
  }
}
markDoneTask();

function filterByDate(date) {
  const filteredArr = taskArr.filter((task)=>{
    return task.date == date;
  });
  loadTasksOnScreen(filteredArr);

  const headingDate = document.querySelectorAll(".current-date");

  if(todayText == date){
    headingDate.forEach((el)=>el.innerHTML="dzisiaj");
  } else {
    headingDate.forEach((el)=>el.innerHTML=date);
  }
}

console.log(taskArr);