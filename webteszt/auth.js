// Bejelentkezési állapot és felhasználónév
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
let username = localStorage.getItem("username") || "";

// Felhasználói felület átváltása
function toggleAuthUI() {
    const loginItems = document.querySelectorAll("[data-auth='guest']");
    const profileItems = document.querySelectorAll("[data-auth='user']");
    
    if (isLoggedIn) {
        loginItems.forEach(item => item.style.display = "none");
        profileItems.forEach(item => item.style.display = "block");
        document.getElementById("usernameDisplay").textContent = username;
    } else {
        loginItems.forEach(item => item.style.display = "block");
        profileItems.forEach(item => item.style.display = "none");
    }
}

// Oldal betöltésekor
document.addEventListener("DOMContentLoaded", () => {
    toggleAuthUI();
});

// Bejelentkezés
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    username = document.getElementById('username').value;

    if (username.trim() === "") {
        alert("Kérjük, adjon meg egy felhasználónevet!");
        return;
    }

    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("username", username);
    toggleAuthUI();
});

// Kilépés
document.getElementById('logout-btn')?.addEventListener('click', () => {
    isLoggedIn = false;
    username = "";
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    toggleAuthUI();
});