// let arrayOfTasks = [];

// create_task.onclick = function(){
//   if(input.value !== ""){
//     let div = document.createElement("div");
//     div.className = "child_task"
//     div.setAttribute("data-id",Date.now());
//     div.innerHTML = input.value;
//     let span = document.createElement("span");
//     span.className = "deleted";
//     span.innerHTML = "Delete";
//     arrayOfTasks.push(div)
//     div.appendChild(span)
//     window.localStorage.setItem(div.dataset.id,div.dataset.id);
//     tasks.appendChild(div)
//     input.value = "";
//   }
// }

// for(let i=0; i<arrayOfTasks.length; i++){
//   console.log(arrayOfTasks[i])
// }

// tasks.addEventListener("click",(e)=>{
//   if(e.target.classList.contains("deleted")){
//     e.target.parentElement.remove()
//     window.localStorage.removeItem(e.target.dataset.id)
//   }
// })

let form = document.querySelector(".form");
let input = document.querySelector(".input_task");
let submit = document.querySelector(".create_task");
let tasks = document.querySelector(".tasks");

let arrayOfTasks = [];

if(window.localStorage.getItem("tasks")){
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}

getDataFromLocalStorage();


submit.onclick = function () {
  if (input.value !== "") {
    addTasksToArray(input.value);
    input.value = "";
  }
};

function addTasksToArray(value) {
  // create tasks object
  const task = {
    id: Date.now(),
    title: value,
    completed:false,
  };
  arrayOfTasks.push(task);
  addElementToPage(arrayOfTasks);
  addArrayOfTasksToLocalStorage(arrayOfTasks);
}

function addElementToPage(arrayOfTasks){
  tasks.innerHTML = "";
  arrayOfTasks.forEach((task)=>{
    let div = document.createElement("div");
    div.className = "task";
    if(task.completed){
      div.className = "task done"
    }
    div.setAttribute("data-id",task.id);
    div.innerHTML = task.title;
    let span = document.createElement("span");
    span.className = "delete"
    span.innerHTML = "Delete"
    div.appendChild(span)
    tasks.appendChild(div)
  })
}

function addArrayOfTasksToLocalStorage(arrayOfTasks){
  window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
  let Data = window.localStorage.getItem("tasks");
  if(Data){
    let parseTask = JSON.parse(Data);
    addElementToPage(parseTask);
  }
}

tasks.addEventListener("click",(e)=>{
  if(e.target.className === "delete"){
    e.target.parentElement.remove()
    deleteElementFromLocalStorage(e.target.parentElement.getAttribute("data-id"))
  }
})


function deleteElementFromLocalStorage(taskId){
  // for(let i = 0; i<arrayOfTasks.length; i++){
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`)
  // }

  arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId);
  addArrayOfTasksToLocalStorage(arrayOfTasks);
}


// remove all
let reAll = document.querySelector(".remove-all");

reAll.onclick = function(){
  tasks.innerHTML = "";
  window.localStorage.clear();
  arrayOfTasks = [];
}