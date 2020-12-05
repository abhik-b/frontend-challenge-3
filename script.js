const todoInput = document.querySelector("#todo-input");
const submitInput = document.querySelector("#submit");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".completedCount");
const remarks = document.querySelector(".remarks");
const footer = document.querySelector(".footer");

var elem = null;
let todos = [
  { value: "Complete online javascript course", checked: true },
  { value: "Jog around the park 3x", checked: false },
  { value: "10 minute meditation", checked: false },
  { value: "Read for 1 hour", checked: false },
  { value: "Pick up groceries", checked: false },
  { value: "Complete todo app on FrontendMentor", checked: false },
];
window.addEventListener("load", () => {
  todos.forEach((t) => {
    newTodo(t.value, t.checked);
    countComplted();
  });
});

function updateUi(notodos) {
  if (notodos) {
    remarks.querySelectorAll("div").forEach((d) => {
      d.style.display = "none";
    });
    const p = document.createElement("p");
    p.textContent = "No todos ";
    remarks.appendChild(p);
    remarks.style.borderRadius = "8px";
    footer.style.display = "none";
  } else {
    footer.style.display = "block";
    remarks.style.borderRadius = "0px";
    remarks.style.borderBottomLeftRadius = "8px";
    remarks.style.borderBottomRightRadius = "8px";
    remarks.querySelector("p").remove();
    remarks.querySelectorAll("div").forEach((d) => {
      d.style.display = "flex";
    });
  }
}

todoInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    if (e.target.value !== "") createTodo(e.target.value);
  }
});

submitInput.addEventListener("click", () => {
  if (todoInput.value !== "") createTodo(todoInput.value);
});

function createTodo(value) {
  todos.push({ value: value, checked: false });
  newTodo(value);
  todoInput.value = "";
  countComplted();
  if (todos.length > 0 && todos.length < 2) {
    updateUi(false);
  }
}

function updateTodos(value, bool) {
  todos.forEach((t) => {
    if (t.value === value) {
      t.checked = bool;
    }
  });
}

function countComplted() {
  completedCount.textContent = `${
    todos.filter((t) => t.checked === false).length
  } items left`;
}

function changeTheme() {
  document.body.classList.toggle("light");
  console.log(todos);
}

function clearCompleted() {
  todos = todos.filter((t) => t.checked !== true);
  document.querySelectorAll(".todo").forEach((todo) => {
    if (todo.querySelector("input").checked) {
      todo.remove();
    }
  });
  if (todos.length === 0) {
    updateUi(true);
  }
}

function showAll(e) {
  document.querySelectorAll(".filters div").forEach((d, i) => {
    if (i === 0) {
      d.classList.add("filterActive");
    } else {
      d.classList.remove("filterActive");
    }
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
  });
}

function filterCompleted() {
  document.querySelectorAll(".filters div").forEach((d, i) => {
    if (i === 2) {
      d.classList.add("filterActive");
    } else {
      d.classList.remove("filterActive");
    }
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
    if (!todo.querySelector("input").checked) {
      todo.style.display = "none";
    }
  });
}

function filterActive(e) {
  document.querySelectorAll(".filters div").forEach((d, i) => {
    if (i === 1) {
      d.classList.add("filterActive");
    } else {
      d.classList.remove("filterActive");
    }
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
    if (todo.querySelector("input").checked) {
      todo.style.display = "none";
    }
  });
}

var el = document.querySelector(".todos");
var sortable = Sortable.create(el, {
  onEnd: function (evt) {
    const todo = evt.item;
    const value = todo.querySelector("p").textContent;
    let index = todos.findIndex((t) => t.value === value);
    todos.splice(index, 1);

    if (todo.nextSibling) {
      let index1 = todos.findIndex(
        (t) => t.value === todo.nextSibling.querySelector("p").textContent
      );
      todos.splice(index1, 0, {
        value: value,
        checked: todo.querySelector("input").checked,
      });
    } else {
      todos.push({
        value: value,
        checked: todo.querySelector("input").checked,
      });
    }
  },
});
