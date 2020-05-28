const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.menu');
const container = document.querySelector('.container');

const handleClick = () => {
  hamburger.classList.toggle('hamburger--active');
  nav.classList.toggle('menu--active');
  container.removeEventListener('click', handleClick);
  if(hamburger.classList.contains('hamburger--active')){
    container.addEventListener('click', handleClick);
  }
}

hamburger.addEventListener('click', handleClick);

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


//task card tools


const moreOptionsBtn = document.getElementsByClassName("show-tools");
const moreTools = [];
for (let item of moreOptionsBtn) {
  moreTools.push(item.parentNode);
}

for (let button of moreOptionsBtn) {
  console.log(button);
  button.addEventListener('click', (e) => {
    e.target.parentNode.classList.toggle("edit--active");
    console.log(e.target.parentNode);
  })
}
