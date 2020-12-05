function newTodo(value, checked = false) {
  const todo = document.createElement("div");
  const todoText = document.createElement("p");
  const todoCheckBox = document.createElement("input");
  const todoCheckBoxLabel = document.createElement("label");
  const todoCross = document.createElement("span");

  todoText.textContent = value;
  todoCheckBox.type = "checkbox";
  todoCheckBox.name = "checkbox";
  todoCheckBox.checked = checked;
  todoCheckBoxLabel.htmlFor = "checkbox";

  todoCheckBoxLabel.addEventListener("click", function (e) {
    if (todoCheckBox.checked) {
      todoCheckBox.checked = false;
      todoText.style.textDecoration = "none";
      todoCheckBoxLabel.classList.remove("active");
      updateTodos(value, false);
      countComplted();
    } else {
      updateTodos(value, true);
      countComplted();
      todoCheckBox.checked = true;
      todoText.style.textDecoration = "line-through";
      todoCheckBoxLabel.classList.add("active");
    }
  });

  todoCross.addEventListener("click", function (e) {
    e.target.parentElement.remove();
    todos = todos.filter((t) => t.value !== value);
    countComplted();
    if (todos.length === 0) {
      updateUi(true);
    }
  });

  todo.classList.add("todo");
  todoCheckBoxLabel.classList.add("circle");
  if (checked) {
    todoCheckBoxLabel.classList.add("active");
    todoText.style.textDecoration = "line-through";
  }
  todoCross.classList.add("cross");

  todo.appendChild(todoCheckBox);
  todo.appendChild(todoCheckBoxLabel);
  todo.appendChild(todoText);
  todo.appendChild(todoCross);

  todosContainer.appendChild(todo);
}

function isBefore(elem1, el2) {
  for (
    var cur = elem1.previousSibling;
    cur && cur.nodeType !== 9;
    cur = cur.previousSibling
  )
    if (cur === el2) return true;
  return false;
}

// pure js dragging for pointer devices
// todo.draggable = true;
// todo.addEventListener("dragstart", (e) => {
//   e.dataTransfer.effectAllowed = "move";
//   elem = e.target;
// });

// todo.addEventListener("dragover", (e) => {
//   let el1;
//   e.preventDefault();
//   if (e.target.classList.contains("todo")) {
//     el1 = e.target;
//   } else {
//     el1 = e.target.parentElement;
//   }

//   if (isBefore(elem, el1)) {
//     el1.parentNode.insertBefore(elem, el1);
//   } else {
//     el1.parentNode.insertBefore(elem, el1.nextSibling);
//   }
// });

// todo.addEventListener("dragend", () => {
//   elem = null;

//   let index = todos.findIndex((t) => t.value === value);
//   todos.splice(index, 1);

//   if (todo.nextSibling) {
//     let index1 = todos.findIndex(
//       (t) => t.value === todo.nextSibling.querySelector("p").textContent
//     );
//     todos.splice(index1, 0, {
//       value: value,
//       checked: todo.querySelector("input").checked,
//     });
//   } else {
//     todos.push({
//       value: value,
//       checked: todo.querySelector("input").checked,
//     });
//   }
// });
