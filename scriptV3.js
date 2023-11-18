const commentBox = document.querySelector("#commentBox");
const addCommentBtn = document.querySelector("#addCommentBtn");
const toDoList = document.querySelector("#toDoList");
const alert =
  '<div class="alert alert-danger alert-dismissible  fade show" role="alert">Text field cannot be empty!<button type="button" class="btn-close " aria-label="Close" data-bs-dismiss="alert"></button></div>';
const showError = document.getElementById("show-error");

// var todos = receiveTodos;
let todos = [];
// var todos = [{ title: "", id: "", done: "" }];
let newTodo = {};

//receive from server
const receiveTodos = function () {
  fetch("http://localhost:3000/todos")
    .then((r) => r.json())
    .then((data) => {
      data.forEach((newTodo) => insertNewTodo(newTodo));
    });
};

receiveTodos();

let btnClickCounter = 0;

function insertNewTodo() {
  console.log(btnClickCounter++);

  newTodo = {
    title: commentBox.value,
    // aici e problema, nu vede titlul
    id: new Date().getTime(),
    done: false,
  };

  let listItem = document.createElement("li");
  listItem.style.listStyleType = "none";
  // let listItemText = " " + commentBox.value;

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.className = "btn btn-primary float-end";

  let check = document.createElement("checkbox");
  check.innerHTML = "<input type='checkbox' id='checkbox'>";

  listItem.innerHTML = `<span id="${newTodo.id}">${newTodo.title}<span>`;
  listItem.className = "container list-group-item";

  toDoList.appendChild(listItem);
  listItem.prepend(check);
  listItem.appendChild(deleteBtn);

  //   commentBox.value = "";

  deleteBtn.addEventListener("click", () => {
    deleteTodos();
    listItem.remove();
  });

  // //checkbox event
  // checkbox.addEventListener("change", () => {
  //   if (this.checked) {
  //     console.log("Checkbox is checked..");
  //     newTodo.done = true;
  //   } else {
  //     console.log("Checkbox is not checked..");
  //   }
  // });
}

//delete from server
const deleteTodos = function () {
  fetch(`http://localhost:3000/todos/${newTodo.id}`, {
    method: "DELETE",
  }).then(() => {
    console.log("intra in fetch delete");
    todos = "";
    todos = serverTodos;
  });
};

//send to server
const sendTodos = function () {
  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  }).then(() => {
    todos = "";
    todos = receiveTodos;
  });
};

addCommentBtn.addEventListener("click", () => {
  if (commentBox.value == "") {
    showError.innerHTML = alert;
  } else {
    insertNewTodo();
    sendTodos();
    showError.innerHTML = "";
  }

  //   todos.push(newTodo);
  console.log("am ajuns aici");
  console.log(todos);
});

//json
// "posts": [
//   {
//     "id": 1,
//     "title": "json-server",
//     "author": "typicode"
//   }
// ],
// "comments": [
//   {
//     "id": 1,
//     "body": "some comment",
//     "postId": 1
//   }
// ],
// "profile": {
//   "name": "typicode"
// },
