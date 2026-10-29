
/* ACADEMIC PLANNER */

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const taskSummary = document.getElementById("task-summary");

if (taskForm && taskList && emptyMessage && taskSummary) {
    // Load saved tasks from the browser.
    let tasks = [];

    try {
        tasks = JSON.parse(localStorage.getItem("favourAcademicTasks")) || [];
    } catch (error) {
        tasks = [];
    }

    // Save tasks in the browser.
    function saveTasks() {
        localStorage.setItem("favourAcademicTasks", JSON.stringify(tasks));
    }

    // Display all tasks on the page.
    function displayTasks() {
        taskList.replaceChildren();

        emptyMessage.hidden = tasks.length > 0;

        const remainingTasks = tasks.filter(task => !task.completed).length;
        taskSummary.textContent =
            `${remainingTasks} task${remainingTasks === 1 ? "" : "s"} remaining`;

        tasks.forEach(function (task) {
            const listItem = document.createElement("li");
            listItem.className = "task-item";

            if (task.completed) {
                listItem.classList.add("completed");
            }

            const details = document.createElement("div");
            details.className = "task-details";

            const title = document.createElement("h3");
            title.textContent = task.title;

            const course = document.createElement("p");
            course.textContent = `Course: ${task.course}`;

            const dueDate = document.createElement("p");
            dueDate.textContent = `Due date: ${task.date}`;

            details.append(title, course, dueDate);

            const actions = document.createElement("div");
            actions.className = "task-actions";

            const completeLabel = document.createElement("label");
            completeLabel.className = "complete-label";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.setAttribute("aria-label", `Mark ${task.title} as complete`);

            const completeText = document.createElement("span");
            completeText.textContent = "Completed";

            completeLabel.append(checkbox, completeText);

            // Mark a task as complete or incomplete.
            checkbox.addEventListener("change", function () {
                task.completed = checkbox.checked;
                saveTasks();
                displayTasks();
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";

            // Delete a task.
            deleteButton.addEventListener("click", function () {
                tasks = tasks.filter(item => item.id !== task.id);
                saveTasks();
                displayTasks();
            });

            actions.append(completeLabel, deleteButton);
            listItem.append(details, actions);
            taskList.appendChild(listItem);
        });
    }

    // Add a new task when the form is submitted.
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("task-title").value.trim();
        const course = document.getElementById("task-course").value.trim();
        const date = document.getElementById("task-date").value;

        if (!title || !course || !date) {
            alert("Please fill in all the task fields.");
            return;
        }

        const newTask = {
            id: `${Date.now()}-${Math.random()}`,
            title: title,
            course: course,
            date: date,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        displayTasks();
        taskForm.reset();
    });

    // Show saved tasks when the page opens.
    displayTasks();
}



/* ===== CONTACT FORM VALIDATION ===== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const phone = document.getElementById("contact-phone").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        const feedback = document.getElementById("contact-feedback");

        // Clear old errors and messages.
        document.querySelectorAll(".error-message").forEach(function (error) {
            error.textContent = "";
        });

        feedback.textContent = "";
        feedback.className = "";

        let valid = true;

        if (!name) {
            document.getElementById("name-error").textContent =
                "Please enter your full name.";
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            document.getElementById("email-error").textContent =
                "Please enter your email address.";
            valid = false;
        } else if (!emailPattern.test(email)) {
            document.getElementById("email-error").textContent =
                "Please enter a valid email address.";
            valid = false;
        }

        if (!phone) {
            document.getElementById("phone-error").textContent =
                "Please enter your phone number.";
            valid = false;
        } else if (!/^\d+$/.test(phone)) {
            document.getElementById("phone-error").textContent =
                "Use digits only, without spaces or symbols.";
            valid = false;
        }

        if (!message) {
            document.getElementById("message-error").textContent =
                "Please enter a message.";
            valid = false;
        }

        if (!valid) {
            feedback.textContent = "Please correct the errors above.";
            feedback.className = "failure";
            return;
        }

        feedback.textContent =
            "Form validated successfully! This demo does not send messages yet.";
        feedback.className = "success";

        contactForm.reset();
    });
}
