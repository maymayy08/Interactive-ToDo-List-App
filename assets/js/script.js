// **Refer to HTML Elements**

// Refer to whole page of Main Container 
var mainContentEl = document.getElementById("mainContent"); 
// The title 
var titleEl = document.getElementById("pageTitle");
// The input field for task description 
var inputTaskEl = document.getElementById("inputTask");
// Add task button 
var addTaskEl = document.getElementById("addTask");
// The input field for selecting a date
var dateEl = document.getElementById("date");

// Triggle the Add button when user click and create add function
addTaskEl.addEventListener("click", add);

// Grab the function from previous and use it here
function add() {
// Create variable and assign to input element, remove white spaces from both end for cleaner structure
  var input = inputTaskEl.value.trim();
//   Create variable and assign to date element 
  var dueDate = dateEl.value;
//   Get HTML element - The to do list ID
  var todoListEl = document.getElementById("todoList");

  // Tell the user, if no task is enter, prompt the message 
  if (!input) {
    alert("Please enter a task");
    // return nothing else after 
    return;
  }
// Tell the user, if no date selected, prompt a message 
  if (!dueDate) {
    alert("Please select a date");
    // return nothing else after
    return;
  }

//   Create a new HTML Dom element of list 
  var newParagraph = document.createElement("li");
//   Create class name of task 
  newParagraph.classList.add("task");
//   Given the element a name 
  newParagraph.textContent = input;
//   Get the parent todoListEL Div from HTML element and create child element then assign to parent
  todoListEl.appendChild(newParagraph);
//   clear user input 
  inputTaskEl.value = "";

  // Re-assign variable to new element 
  var dueDate = dueDate;  

  // Create a new Date object from the string
  var dateObj = new Date(dueDate);
  
  // Format the date in the en-GB locale (DD/MM/YYYY)
  var formattedDate = dateObj.toLocaleDateString('en-GB');
  
  // Create a new <span> element to display the due date
  var dateInput = document.createElement("span");
  dateInput.classList.add("dueDate");
  
  // Set the formatted date as the text content of the <span>
  dateInput.textContent = formattedDate;
  
  // Append the date to the todo list element
  todoListEl.appendChild(dateInput);

// create delete button 
  var deleteTaskEl = document.createElement("button");
//   create delete class 
  deleteTaskEl.classList.add("delete-btn");
//   Give element a name 
  deleteTaskEl.textContent = "🗑️";
// create a event listner and create a function inside 
  deleteTaskEl.addEventListener("click", handleDelete);
// handle function from event listner then trigger it, when user click delete. it remove the input from the list and then prompt a message remindar
  function handleDelete() {
    if (newParagraph) {
      todoListEl.removeChild(newParagraph);
      alert("Task deleted");
      return;
    }
  }
// create edit button 
  var editTaskEl = document.createElement("button");
// Create a class for edit 
  editTaskEl.classList.add("edit-btn");
//   Give the element a name 
  editTaskEl.textContent = "📝";

  // Event listener for the Edit button
  editTaskEl.addEventListener("click", function () {
    var isEditing = newParagraph.classList.contains("editing");

    if (isEditing) {
      // Save the new task text when in editing mode
      var updatedText = newParagraph.querySelector("input").value.trim();
      if (updatedText) {
        newParagraph.textContent = updatedText; // Update the task's text
      }
      newParagraph.classList.remove("editing"); // Remove the editing mode

      // Re-add the Edit and Delete buttons after saving
      newParagraph.appendChild(editTaskEl);
      newParagraph.appendChild(deleteTaskEl);

      editTaskEl.textContent = "📝"; // Change button text back to "Edit"
    } else {
      // Switch to editing mode by removing current buttons and adding the input
      newParagraph.classList.add("editing"); // Mark as editing mode

      // Remove the Edit and Delete buttons before adding the input
      newParagraph.innerHTML = ""; // Clear the current task text and buttons

      var editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = input; // Pre-fill input with current task text
      newParagraph.appendChild(editInput); // Add the input field for editing

      // Change the Edit button to Save
      editTaskEl.textContent = "Save";

      // Re-attach the buttons after switching to edit mode
      newParagraph.appendChild(editTaskEl);
      newParagraph.appendChild(deleteTaskEl);
    }
  });

// Create complete button
  var completeTaskEl = document.createElement("button")
// Create a class for complete button for styling 
  completeTaskEl.classList.add("complete-Btn");
//   Assign a name for the button 
  completeTaskEl.textContent = "✅";

//   create event listner 
  completeTaskEl.addEventListener("click", function() {
    // create a class for styling and then triggle the input field, when user click on complete, the input field text strikethrough 
    newParagraph.classList.toggle("strikethrough");
    dateInput.classList.toggle("strikethrough")
  });


  // Append Edit, Complete and Delete buttons to the task
  newParagraph.appendChild(editTaskEl);
  newParagraph.appendChild(deleteTaskEl);
  newParagraph.appendChild(completeTaskEl);

  
  // Clear the input fields after adding the task
  inputTaskEl.value = "";
  dateEl.value = "";
}
