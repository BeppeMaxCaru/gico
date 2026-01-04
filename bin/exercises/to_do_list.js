let inputText = document.getElementById("to-do-item-text");
let addButton = document.getElementById("add-button");
let toDoListElements = document.getElementById("to-do-list-elements");

const createListItem = (text) => {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
};

const handleAddTask = () => {
  const taskText = inputText.value.trim();

  if (!taskText) {
    alert("Please enter a valid task!");
    return;
  }

  const newTask = createListItem(taskText);
  toDoListElements.append(newTask);

  inputText.value = "";
  inputText.focus();
}

addButton.addEventListener("click", handleAddTask);

inputText.addEventListener("keypress", (event) => {
  if (event.key = "Enter") {
    handleAddTask();
  }
})