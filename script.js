 
//  finding elements 
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");
const todoAddButton = document.querySelector("#todoAddButton");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector("#message")

// create todo list item
const createToDoList = (todoId,todoValue)=>{
  const todoElement =   document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("li-style")
  todoElement.innerHTML = `
  <span> ${todoValue} </span>
  <span> 
  <button id="deleteButton"> <i class="fa-solid fa-trash"></i> </button> 
  </span>
  `
  todoLists.appendChild(todoElement);

//   find the delete todo button
const deleteButton = todoElement.querySelector("#deleteButton");
deleteButton.addEventListener("click",deleteToDo);

}
// delete todo
const deleteToDo = (event)=>{
    // console.log("delete button is clicked")
    const selectedToDo =  event.target.parentElement.parentElement.parentElement ;
    todoLists.removeChild(selectedToDo);
    showMessage("todo is deleted",'danger');
    // deleted the local storage item
     let todos = getToDosFromLocalStorage();
    todos =  todos.filter((todo)=>todo.todoId!==selectedToDo.id)
    localStorage.setItem("mytodos",JSON.stringify(todos));

}   
// showMessage 
const showMessage = (text,status)=>{
    messageElement.innerText = text
    messageElement.classList.add(`bg-${status}`);
    setTimeout(()=>{
        messageElement.innerText = '';
        messageElement.classList.remove(`bg-${status}`);
    },1200)
}
// getToDosFromLocalStorage 
 const getToDosFromLocalStorage = ()=>{
  return  localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
 }

// Add todo
const addTodo = (event)=>{
    event.preventDefault();
    // console.log(todoInput.value)
    const todoValue = todoInput.value;
    
    // unique id
    const todoId = Date.now().toString();

    
    // createToDoList
    createToDoList(todoId,todoValue);
    
    // showMessage
    showMessage('todo is added','success');

    // adding todo's local storage
    const todos =  getToDosFromLocalStorage();
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));

    // todoInput value reset 
    todoInput.value = "";
}
// load todos
const loadTodos = ()=>{
 const todos = getToDosFromLocalStorage();
 todos.map((todo)=>createToDoList(todo.todoId,todo.todoValue));
}
 
// adding listener
todoForm.addEventListener("submit",addTodo)
window.addEventListener("DOMContentLoaded",loadTodos)