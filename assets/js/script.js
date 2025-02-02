var mainContentEl = document.getElementById("mainContent");
var titleEl = document.getElementById("pageTitle");
var inputTaskEl = document.getElementById("inputTask");
var addTaskEl = document.getElementById("addTask");
var dateEl = document.getElementById("date");

addTaskEl.addEventListener("click", add);

function add() {
  var input = inputTaskEl.value.trim();
  var dueDate = dateEl.value;
  var todoListEl = document.getElementById("todoList");

  if (!input) {
    alert("Please enter a task");
    return;
  }

  if (!dueDate) {
    alert("Please select a date");
    return;
  }

  var newParagraph = document.createElement("li");
  newParagraph.classList.add("task");
  newParagraph.textContent = input;
  todoListEl.appendChild(newParagraph);
  inputTaskEl.value = "";

  var deleteTaskEl = document.createElement("button");
  deleteTaskEl.classList.add("delete-btn");
  deleteTaskEl.textContent = "🗑️";

  deleteTaskEl.addEventListener("click", handleDelete);

  function handleDelete() {
    if (newParagraph) {
      todoListEl.removeChild(newParagraph);
      alert("Task deleted");
      return;
    }
  }

  var editTaskEl = document.createElement("button");
  editTaskEl.classList.add("edit-btn");
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

   
  var completeTaskEl = document.createElement("button")
  completeTaskEl.classList.add("complete-Btn");
  completeTaskEl.textContent = "✅";

  completeTaskEl.addEventListener("click", function() {
    newParagraph.classList.toggle("strikethrough");
  });


  // Append Edit and Delete buttons to the task
  newParagraph.appendChild(editTaskEl);
  newParagraph.appendChild(deleteTaskEl);
  newParagraph.appendChild(completeTaskEl);

  


  // Clear the input fields after adding the task
  inputTaskEl.value = "";
  dateEl.value = "";
}
