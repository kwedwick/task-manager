var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIDCounter = 0;

var taskFormHandler = function(event) {
    event.preventDefault();
    //we're trying to select an HTML element by one of its attributes.
    //In this case, we're selecting the <input> element on the page that has a name attribute set to a value of "task-name".
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check in input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    // reset is specifically and ONLY for form reset values so once you submit, they clear so you can start inputing in things again
    formEl.reset();
    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // creates list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIDCounter);
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give the div a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // pushes div into li 
    listItemEl.appendChild(taskInfoEl);
    
    // linking the createTaskActions ID counter to the li element and appending the value to it
    var taskActionsEl = createTaskActions(taskIDCounter);
    listItemEl.appendChild(taskActionsEl);

    // pushes li into ol
    tasksToDoEl.appendChild(listItemEl);
    // increase task counter for next unique id
    taskIDCounter++;
};

var createTaskActions = function(taskId) {
    // creating a div to hold the button elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // creating buttons
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //creating delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // creating the drop down
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    // creating pull down options
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i=0; i <statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

};

// this has to stay below it's function otherwise it'll come back undefined (top down reading)
formEl.addEventListener("submit", taskFormHandler); 