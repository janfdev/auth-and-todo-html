const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");

switchToRegister.addEventListener("click", () => {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

switchToLogin.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
});

const registerApp = () => {
  const registerNama = document.getElementById("registerNama").value.trim();
  const registerEmail = document.getElementById("registerEmail").value.trim();
  const registerPassword = document
    .getElementById("registerPassword")
    .value.trim();

  if (registerNama && registerEmail && registerPassword) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((user) => user.registerNama === registerNama)) {
      alert("Nama sudah terdaftar!");
      return;
    }

    users.push({ registerNama, registerEmail, registerPassword });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registrasi Berhasil");
  } else {
    alert("Nama, Email dan Password harus diisi");
  }
};

const loginApp = () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (user) => user.registerEmail === email && user.registerPassword === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", email);
    showApp();
  } else {
    alert("Login gagal! Periksa username dan password.");
  }
};

const logout = () => {
  localStorage.removeItem("loggedInUser");
  showAuth();
};

const showApp = () => {
  document.getElementById("authSection").style.display = "none";
  document.getElementById("appSection").style.display = "block";
};

const showAuth = () => {
  document.getElementById("authSection").style.display = "flex";
  document.getElementById("appSection").style.display = "none";
};

// To Do List
document.addEventListener("DOMContentLoaded", function () {
  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    showApp();
    loadTodos();
    displayUsername();
  } else {
    showAuth();
  }
});

const addTodo = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let task = document.getElementById("todoInput").value.trim();

  let date = new Date().toISOString().split("T")[0];

  if (!task) {
    alert("Task harus diisi");
    return;
  }

  let newTodo = { id: Date.now(), task, date, done: false };

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  document.getElementById("todoInput").value = "";
  loadTodos();
};

// Load Data dari Local Storage
const loadTodos = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let notDoneList = document.getElementById("notDone");
  let doneList = document.getElementById("done");

  notDoneList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo) => {
    let li = document.createElement("li");
    li.className = `flex items-center justify-between bg-white border-2 ${
      todo.done ? "border-green-500" : "border-red-500"
    } rounded-md p-4 mb-2`;

    li.innerHTML = `
    
     <div class="flex flex-col gap-2">
        <h1 class="text-lg capitalize">${todo.task}</h1>
        <p class="text-gray-500 text-sm">${todo.date}</p>
      </div>
      <div class="flex gap-2">

      ${
        !todo.done
          ? `
       <button
       onclick="moveToDone(${todo.id})"
        class="bg-green-500 cursor-pointer text-white py-1 px-2 rounded-md hover:bg-green-700 transition"
        >
        <i class="bx bx-check"></i>
      </button>
      `
          : `
       <button
       onclick="undoTodo(${todo.id})"
        class="bg-red-500 text-white cursor-pointer py-1 px-2 rounded-md hover:bg-red-700 transition"
        >
        <i class="bx bx-undo"></i>
      </button>
      `
      }
               
                <button
                onclick="editTodo(${todo.id})"
                  class="bg-yellow-500 cursor-pointer text-white py-1 px-2 rounded-md hover:bg-yellow-700 transition"
                >
                  <i class="bx bxs-pencil"></i>
                </button>
                <button
                onclick="deleteTodo(${todo.id})"
                  class="bg-red-500 cursor-pointer text-white py-1 px-2 rounded-md hover:bg-red-700 transition"
                >
                  <i class="bx bx-trash"></i>
                </button>
      </div>
    `;
    todo.done ? doneList.appendChild(li) : notDoneList.appendChild(li);
  });
};

// Move to Done
const moveToDone = (id) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todo = todos.find((t) => t.id === id);
  todo.done = true;
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTodos();
};

// Undo from Done to Not Done
const undoTodo = (id) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todo = todos.find((t) => t.id === id);
  todo.done = false;
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTodos();
};

const editTodo = (id) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todo = todos.find((t) => t.id === id);

  let newTask = prompt("Edit task:", todo.task);
  if (newTask && newTask.trim() !== "") {
    todo.task = newTask.trim();
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
  }
};

const deleteTodo = (id) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || []; // Menghindari bug null

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let updatedTodos = todos.filter((todo) => todo.id !== id);

      if (updatedTodos.length !== todos.length) {
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        loadTodos();

        Swal.fire({
          title: "Deleted!",
          text: "Your todo has been deleted.",
          icon: "success",
        });
      }
    }
  });
};

function displayUsername() {
  const wrapper = document.getElementById("wrapper-auth");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUser = localStorage.getItem("loggedInUser");

  let currentUser = users.find((user) => user.registerEmail === loggedInUser);

  const username = currentUser ? currentUser.registerNama : "Guest";

  const usernameElement = document.createElement("h1");
  usernameElement.classList.add("md:text-xl", "font-semibold", "text-lg");
  usernameElement.textContent = `Welcome, ${username}`;

  if (wrapper) {
    wrapper.prepend(usernameElement);
  }
}
