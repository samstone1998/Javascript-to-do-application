


// global variables
let task_counter = 1;
let saved_tasks = {};


// used to load in saved tasks from localstorage
document.addEventListener("DOMContentLoaded",function(){
  saved_tasks = JSON.parse(window.localStorage.getItem("saved_tasks"));
  for (const [key, value] of Object.entries(saved_tasks)) {
    if(value === "check"){
    document.getElementById("tasks").insertAdjacentHTML("afterend",
      `
      <div class="col-md-6 mx-auto p-2 row m-2 completed rounded" id=task${task_counter}>
      <h5 class="my-auto pl-1">${key}</h5>
      <button id="checkbtn${task_counter}" class="btn btn-light ml-auto mr-2" onclick="completetask(${task_counter})">uncheck</button>

      <button id="removebtn${task_counter}" class="btn btn-danger  mr-2" onclick="removetask(${task_counter})">Remove</button>
      </div>
      `);}
    else{
      document.getElementById("tasks").insertAdjacentHTML("afterend",
      `
      <div class="col-md-6 mx-auto p-2 row m-2 bg-light rounded" id=task${task_counter}>
      <h5 class="my-auto pl-1">${key}</h5>
      <button id="checkbtn${task_counter}" class="btn btn-success ml-auto mr-2" onclick="completetask(${task_counter})">check</button>

      <button id="removebtn${task_counter}" class="btn btn-danger  mr-2" onclick="removetask(${task_counter})">Remove</button>
      </div>
      `);
      
    }
    task_counter +=1;
  }
});


function addtask(){
  const task_name = document.getElementById("task-name").value;
  
  if(task_name != ""){
      document.getElementById("tasks").insertAdjacentHTML("afterend",
      `
      <div class="col-md-6 mx-auto p-2 row m-2 bg-light rounded" id=task${task_counter}>
      <h5 class="my-auto pl-1">${task_name}</h5>
      <button id="checkbtn${task_counter}" class="btn btn-success ml-auto mr-2" onclick="completetask(${task_counter})">check</button>

      <button id="removebtn${task_counter}" class="btn btn-danger  mr-2" onclick="removetask(${task_counter})">Remove</button>
      </div>
      `);
    saved_tasks[task_name] = "uncheck"
    window.localStorage.saved_tasks = JSON.stringify(saved_tasks);
    task_counter +=1;
     }
  
  
  document.getElementById("task-name").value = "";
}


function removetask(task_id){
  let task_name = document.getElementById(`task${task_id}`);
  delete saved_tasks[task_name.firstElementChild.innerText];
  task_name.remove();
  window.localStorage.saved_tasks = JSON.stringify(saved_tasks);
}


function completetask(task_id){
  const task = document.getElementById(`task${task_id}`);
  const btn  = document.getElementById(`checkbtn${task_id}`);
  let task_name = document.getElementById(`task${task_id}`).firstElementChild.innerText;
  
  if(task.classList.contains("completed")){
    task.classList.remove("completed");
    task.classList.add("bg-light");
    btn.classList.remove("btn-light");
    btn.classList.add("btn-success");
    btn.innerText = "check";
    saved_tasks[task_name] = "uncheck";
    window.localStorage.saved_tasks = JSON.stringify(saved_tasks);
  }
  else{
  task.classList.remove("bg-light");
  task.classList.add("completed");
  btn.classList.remove("btn-success");
  btn.classList.add("btn-light");
  btn.innerText = "uncheck";
    saved_tasks[task_name] = "check";
    window.localStorage.saved_tasks = JSON.stringify(saved_tasks);
  }
  
}