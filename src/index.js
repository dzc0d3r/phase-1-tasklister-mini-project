document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form")
  const tasksList = document.getElementById("tasks")
  const sortButton = document.getElementById("sort-button")
  let ascendingOrder = true;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form)
    const taskDescription = formData.get("new-task-description").trim();
    const taskPriority = formData.get("task-priority")
    const taskUser = formData.get("task-user");
    const editBox = document.getElementById("editBox")
    const closeModal = document.getElementById("closeModal")
    const editTask = document.getElementById("taskEdit")


    if (taskDescription !== "") {
      const newTaskItem = document.createElement("li")
      newTaskItem.innerHTML = ` <span id="desc">- Description: ${taskDescription}  | User: ${taskUser}   | Priority: ${taskPriority}</span>`
      newTaskItem.classList.add(taskPriority)

      const deleteButton = document.createElement("button")
      deleteButton.textContent = "🗑"
      deleteButton.classList.add("delete-button");

      const editButton = document.createElement("button")
      editButton.textContent = "✎"
      editButton.classList.add("edit-button");

      deleteButton.addEventListener("click", () => {
        tasksList.removeChild(newTaskItem)
      });


      //
      editButton.addEventListener("click", (e) => {
        let itemToEdit = e.target.parentNode.children.item(0)
        editTask.value = itemToEdit.innerText
        editBox.showModal()
        closeModal.addEventListener("click", () => {
          itemToEdit.innerText = editTask.value
          itemToEdit = ''
          editBox.close()




        })
      })




      //
      newTaskItem.appendChild(deleteButton)
      newTaskItem.appendChild(editButton)
      tasksList.appendChild(newTaskItem)

      form.reset()
    }
  });

  sortButton.addEventListener("click", () => {
    const taskItems = [...tasksList.children]


    taskItems.sort((a, b) => {
      const priorityMap = { high: 3, medium: 2, low: 1 }
      const priorityA = priorityMap[a.classList[0]]
      const priorityB = priorityMap[b.classList[0]]
      return ascendingOrder ? priorityA - priorityB : priorityB - priorityA
    });



    tasksList.innerHTML = "";
    taskItems.forEach((item) => {
      tasksList.appendChild(item)
    });

    ascendingOrder = !ascendingOrder
  });
});
