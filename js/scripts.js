var addButton = document.getElementById("add-button");
var clearCompletedButton = document.getElementById("clear-completed-button");
var emptyListButton = document.getElementById("empty-button");
var saveButton = document.getElementById("save-button");
var taskEntryBox = document.getElementById("task-entry-box");
var taskList = document.getElementById("task-list");

addButton.addEventListener("click", addToDoItem);

function addToDoItem() {
    var itemText = taskEntryBox.value;
    newToDoItem(itemText, false);
}

clearCompletedButton.addEventListener("click", clearCompletedToDoItems);

function clearCompletedToDoItems() {
    var completedItems = taskList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

emptyListButton.addEventListener("click", emptyList);

function emptyList() {
    var taskItems = taskList.children;
    while (taskItems.length > 0) {
        taskItems.item(0).remove();
    }
}

saveButton.addEventListener("click", saveList);

function saveList() {
    var toDos = [];

    for (var i = 0; i < taskList.children.length; i++) {
        var toDo = taskList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText =document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    taskList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();
