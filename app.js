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

  //   loadItems();
};

const showAuth = () => {
  document.getElementById("authSection").style.display = "flex";
  document.getElementById("appSection").style.display = "none";
};

document.addEventListener("DOMContentLoaded", function () {
  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    showApp();
  } else {
    showAuth();
  }
});
