const addCommentBtn = document.querySelector("#addCommentBtn");
const commentBox = document.querySelector("#commentBox");
const toDoList = document.querySelector("#toDoList");
const comment = document.querySelector("#comment");

var clicks = 0;

function clickCounter() {
  clicks += 1;
  console.log("button was clicked");
}

addCommentBtn.addEventListener("click", clickCounter);

let newTodo = {
  title: commentBox.value,
};

function sendComment() {
  // comment.insertAdjacentHTML("afterend", `<li>${commentBox.value}</li>`);
  comment.insertAdjacentHTML(
    "afterend",
    `<li class="list-group-item">${commentBox.value}</li>`
  );

  commentBox.value = "";
  console.log("ajunge aici");
}

addCommentBtn.addEventListener("click", sendComment);
