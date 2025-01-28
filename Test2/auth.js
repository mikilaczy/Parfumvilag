let isLoggedIn = false; // Alapértelmezett: nincs bejelentkezve
let username = ""; // Felhasználónév

// Bejelentkezés szimulálása
function simulateLogin() {
    isLoggedIn = true;
    username = "Felhasználó"; // Példa felhasználónév
    updateNavbar();
}


function simulateLogout() {
    isLoggedIn = false;
    username = "";
    updateNavbar();
}


function updateNavbar() {
    const loginItem = document.getElementById("loginItem");
    const registerItem = document.getElementById("registerItem");
    const profileItem = document.getElementById("profileItem");
    const usernameDisplay = document.getElementById("usernameDisplay");

    if (isLoggedIn) {
        loginItem.classList.add("d-none");
        registerItem.classList.add("d-none");
        profileItem.classList.remove("d-none");
        usernameDisplay.textContent = username;
    } else {
        loginItem.classList.remove("d-none");
        registerItem.classList.remove("d-none");
        profileItem.classList.add("d-none");
    }
}

// Oldal betöltésekor frissítjük a navigációs sávot
window.onload = () => {
    updateNavbar();
    // Példa: Bejelentkezés szimulálása 2 másodperc után
    setTimeout(simulateLogin, 2000);
    // Példa: Kilépés szimulálása 5 másodperc után
    // setTimeout(simulateLogout, 5000);
};