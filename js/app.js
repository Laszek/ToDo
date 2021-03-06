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
    handleClick(hamburger, nav);
    handleClick(addBtn, addForm);
    });

  const menuShowAllTasksBtn = document.querySelector(".all-tasks");
  menuShowAllTasksBtn.addEventListener('click', ()=>{
    filterByTitle("");
    handleClick(hamburger, nav);
  });
//-----------------

//Datepicker elements

const today = new Date();
const todayText = `${lz(today.getDate())}.${lz((today.getMonth()+1))}.${today.getFullYear()}`;

const newTaskDate = document.querySelector('#newTask--date');
const newTaskDatepicker = new Datepicker(newTaskDate);
newTaskDatepicker.setOptions({format: "dd.mm.yyyy"});
newTaskDatepicker.setOptions({minDate: todayText});

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



//Popups

const popupText = document.querySelector(".popup__text");
let popupBtnYes = document.querySelector(".menu__btn.btn--yes");
const popupBtnNo = document.querySelector(".menu__btn.btn--no");
const popupBox = document.querySelector(".popup__box");
popupBtnNo.addEventListener('click', ()=>{
  togglePopup(popupBox);
});

function restorePopupBtnYes(){
  const newPopupBtnYes = popupBtnYes.cloneNode(true);
  popupBtnYes.parentNode.prepend(newPopupBtnYes);
  popupBtnYes.remove();
  popupBtnYes = newPopupBtnYes;
}

function editPopup(el){
  togglePopup(popupBox);

  popupBtnYes.innerHTML = "Potwierdź";
  popupText.innerHTML = `
          <div class="form__container">
          Edycja:
            <form name="editTask" class="editTask">
                <fieldset class='fieldset'>
                    <label for="editTask--title" class="addTask--label">Tytuł zadania</label>
                    <input type="text" id="editTask--title" class="search" required value="${el.title}">
                </fieldset>
                <fieldset class='fieldset'>
                    <label for="editTask--description" class="addTask--label">Opis zadania</label>
                    <textarea id="editTask--description" class="search">${el.description}</textarea>
                </fieldset>
                <fieldset class='fieldset'>
                    <label for="editTask--date" class="addTask--label">Data zadania</label>
                    <input type="text" aria-autocomplete="none" name='editTaskDate' id="editTask--date" value="${el.date}" class="search" required>
                </fieldset>
                <fieldset class='fieldset'>
                    <label for="editTask--time" class="addTask--label">Godzina</label>
                    <input type="time" name='editTaskTime' id="editTask--time" value="${el.time}" class="search" required>
                </fieldset>
                <fieldset class='fieldset'>
                    <p class="addTask--label">Kategoria</p>
                    <div class='category--radio__box'>
                        <div><input name='Category' type="radio" id="editTask--category--home" class="edit-category--radio" value="home"><label for="editTask--category--home"><div class="radio--btn">H</div></label></div>
                        <div><input name='Category' type="radio" id="editTask--category--work" class="edit-category--radio" value="work"><label for="editTask--category--work"><div class="radio--btn">W</div></label></div>
                        <div><input name='Category' type="radio" id="editTask--category--school" class="edit-category--radio" value="school"><label for="editTask--category--school"><div class="radio--btn">S</div></label></div>
                        <div><input name='Category' type="radio" id="editTask--category--car" class="edit-category--radio" value="car"><label for="editTask--category--car"><div class="radio--btn">C</div></label></div>
                        <div><input name='Category' type="radio" id="editTask--category--other" class="edit-category--radio" value="other"><label for="editTask--category--other"><div class="radio--btn">O</div></label></div>
                    </div>
                </fieldset>
                <fieldset class='fieldset'>
                    <label for="editTask--priority" class="addTask--label">Priorytet</label>
                    <select name='editTaskDate' id="editTask--priority" class="search" required>
                        <option value=""></option>
                        <option value="normal">Normalne</option>
                        <option value="important">Ważne</option>
                        <option value="v-important">Bardzo ważne</option>
                    </select>
                </fieldset>
            </form>
        </div>`;
  const editTaskDate = document.querySelector('#editTask--date');
  const editTaskDatepicker = new Datepicker(editTaskDate);
  editTaskDatepicker.setOptions({format: "dd.mm.yyyy"});
  editTaskDatepicker.setOptions({minDate: todayText});

  popupBtnYes.addEventListener('click', ()=>{
    restorePopupBtnYes();
    togglePopup(popupBox);
    const title = document.getElementById("editTask--title").value;
    const description = document.getElementById("editTask--description").value.split("\n").join("<br>");
    const date = document.getElementById("editTask--date").value;
    const time = document.getElementById("editTask--time").value;
    const category = (document.querySelector(".edit-category--radio:checked") != null) ? document.querySelector(".edit-category--radio:checked").value : "";
    const priority = document.querySelector("#editTask--priority").value;
    el.editTask(title, description, date, time, category, priority);
  });
}


function deletePopup(el) {

  togglePopup(popupBox);
  popupBtnYes.innerHTML = "Tak";
  popupBtnYes.addEventListener('click', ()=>{
    restorePopupBtnYes();

    togglePopup(popupBox);
    deleteTask(el.id);
  });
  popupText.innerHTML = "Czy na pewno chcesz usunąć te zadanie?";
}

function settingsPopup() {
  togglePopup(popupBox);
  popupBtnYes.innerHTML = "Wyjdź";
  popupBtnNo.style.display = "none";
  popupBtnYes.addEventListener('click', ()=>{
    restorePopupBtnYes();

    togglePopup(popupBox);
    popupBtnNo.style.display = "inline-block";
  });
  popupText.innerHTML = `<h2>Ustawienia:</h2><br>
    <button class="reset-btn">Zresetuj GTD</button>
  `;

  const resetLSBtn = document.querySelector(".reset-btn");
  resetLSBtn.addEventListener('click', resetLocalStorage);
}

const settingsBtn = document.querySelector(".settings");
settingsBtn.addEventListener('click', settingsPopup);

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
  
    editTask(title, description, date, time, category, priority){
      if(title != "")
        this.title = title;
      if(description != "")
        this.description = description;
      if(date != "")
        this.date = date;  
      if(time != "")
        this.time = time;
      if(category != "")
        this.category = category;  
      if(priority != "")
        this.priority = priority;

      updateLocalStorage();
    }

    deleteTaskQuestion(el){
      deletePopup(el);
    }
    createTask(filter) {
      
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
      taskTime.innerHTML = this.time + ", " + this.date;
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

      if(this.isDone==false){
        
        const taskShowToolsBtn = document.createElement('button');
        taskShowToolsBtn.classList += "tool show-tools fas fa-angle-right fa-2x fa-rotate-180";
        taskShowToolsBtn.addEventListener('click', (e) => e.target.parentNode.classList.toggle("edit--active"));
        taskEdit.append(taskShowToolsBtn);

        const taskEditBtn = document.createElement('button');
        taskEditBtn.classList += "tool btn-edit fas fa-edit fa-2x";
        taskEditBtn.addEventListener('click', ()=>editPopup(this));
        taskEdit.append(taskEditBtn);
      }
  
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
      if(isFiltered == false){
        if(this.isDone == true){
          taskContainer.classList += " done";
          main = document.getElementsByClassName("done-tasks")[0];
        } else
          main = document.getElementsByClassName("active-tasks")[0];
      } else {
        if(this.isDone == true){
          taskContainer.classList += " done";
          main = document.getElementsByClassName("done-tasks__filter")[0];
        }else
          main = document.getElementsByClassName("active-tasks__filter")[0];
      }

      main.append(taskContainer);
    };
  }
Task.counter = 0;


let taskArr = [];

function sortTasksByTime(arr) {
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

  return newTaskArr;
}

function sortTasksByDate(arr) {
  const newTaskArr = arr.sort((a, b)=>{
    let aSplit = a.date.split(".");
    let bSplit = b.date.split(".");

    if(aSplit[2] < bSplit[2])
      return -1;
    if(aSplit[2] > bSplit[2])
      return 1;

    if(aSplit[1]<bSplit[1])
      return -1;
    if(aSplit[1]>bSplit[1])
      return 1

    if(aSplit[0]<bSplit[0])
      return -1;
    if(aSplit[0]>bSplit[0])
      return 1

    return 0;
  });

  return newTaskArr;
}

function loadTasksOnScreen(arr){
  const allTaskCards = document.querySelectorAll(".task__card");
  
  for(let el of allTaskCards){
    el.remove();
  }
  const info = document.querySelector(".no-tasks-info");
  
  const activeTasks= arr.filter((task)=>{
    return task.isDone==false;
  });

  if(activeTasks.length < 1)
    info.innerHTML="Nie ma żadnych zadań"
  else
    info.innerHTML=""

  let sortedByTime = sortTasksByTime(arr);
  newTaskArr = sortTasksByDate(sortedByTime);

  newTaskArr.forEach((task)=>{
      task.createTask();
  });
  
  markDoneTask();
}

//filters
let isFiltered = false;
let searchedTitle = "";

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

function filterByTitle(title) {

  const filteredArr = taskArr.filter((task)=>{
    return task.title.includes(title);
  });

  if(isFiltered==true){
    loadTasksOnScreen(filteredArr);
  } else{
  const filterBox = document.createElement("div");
  filterBox.classList+="filter-box";
  if(title == "")
    filterBox.innerHTML = `<div class="filter__header"><button name="back" class="menu__btn back-btn"><- Powrót</button><h2>Wszystkie zadania:</h2></div>`;
  else
    filterBox.innerHTML = `<div class="filter__header"><button name="back" class="menu__btn back-btn"><- Powrót</button><h2>Wyszukania dla: "${title}"</h2></div>`;
  filterBox.innerHTML += `
  <section class="active-tasks__filter">
    <h3 class="active-tasks__title">aktywne</h3>
    <p class="no-tasks-info"></p>
  </section>
  <section class="done-tasks__filter">
   <h3 class="done-tasks__title">Zrobione</h3>
  </section>`;
  document.body.appendChild(filterBox);
  
  isFiltered = true;
  loadTasksOnScreen(filteredArr);

    const backBtn = document.querySelector(".back-btn");
    backBtn.addEventListener('click', ()=>{
      isFiltered = false;
      filterByDate(filterDate.value);
      filterBox.remove();
    })
  }
}


const filterDate = document.querySelector(".filter--date");
filterDate.value = todayText;
const filterDatepicker = new Datepicker(filterDate);
filterDatepicker.setOptions({
  format: "dd.mm.yyyy",
  todayHighlight: true,
  disableTouchKeyboard: true,
});
filterDate.addEventListener('change', ()=>filterByDate(filterDate.value));

const searchInput = document.querySelector("#search");
const searchInputSubmit = document.querySelector(".search-btn");
searchInputSubmit.addEventListener('click', ()=>{
  if(searchInput.value != ""){
    searchedTitle = searchInput.value;
    filterByTitle(searchedTitle);
    handleClick(hamburger, nav);
  } else 
    alert("Nie można wyszukać pustej frazy!");
});

//------------------------------------

function createTaskObjects(arr){
  for(let task of arr){
      let taskEl = new Task(task.title, task.description, task.time, task.date);
      taskEl.setCategory(task.category);
      taskEl.setPriority(task.priority);
      taskEl.isDone = task.isDone;
      taskArr.push(taskEl);
  }
  if(isFiltered == false)
    filterByDate(filterDate.value);
  else
    filterByTitle(searchedTitle);
}

function loadTasks(){
    taskArr = [];
    const taskStorage = JSON.parse(localStorage.getItem("tasks"));
    if(taskStorage!=undefined)
      createTaskObjects(taskStorage);
};


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
    handleClick(addBtn, addForm);
}

const addNewTaskBtn = document.querySelector(".addTask--submit");
addNewTaskBtn.addEventListener('click', ()=>{
  addNewTask();
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



//function changeSettings(theme, reset){ }

let root = document.documentElement;
function changeTheme(){
  root.style.setProperty("--background", "radial-gradient(circle, rgba(26,26,68,1) 72%, rgba(0,0,0,1) 100%)");
  root.style.setProperty("--background-image", "url(../backgrounds/dark2.jpg)");
}

function resetLocalStorage(){
  if(confirm("Czy na pewno chcesz usunąć wszystkie dane?")){
    taskArr = [];
    updateLocalStorage();
    alert("Zresetowano GTD");
    loadTasks();
  }
}

/*function createScheduleView(){
  isFiltered = true;
}

const scheduleViewBtn = document.querySelector(".graph");
scheduleViewBtn.addEventListener('click', createScheduleView);
*/

console.log(taskArr);

loadTasks();