function loadProfile() {
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileDate = document.getElementById("profileDate");

    // Példa adatok (helyettesítsd valós adatokkal)
    profileName.textContent = "Felhasználó";
    profileEmail.textContent = "felhasznalo@example.com";
    profileDate.textContent = "2023-10-01";
}

// Szerkesztési űrlap megjelenítése/elrejtése
document.getElementById("editProfileButton").addEventListener("click", () => {
    const editForm = document.getElementById("editProfileForm");
    editForm.classList.remove("d-none");
});

document.getElementById("cancelEditButton").addEventListener("click", () => {
    const editForm = document.getElementById("editProfileForm");
    editForm.classList.add("d-none");
});

// Profil adatok frissítése
document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = document.getElementById("editName").value;
    const newEmail = document.getElementById("editEmail").value;
    const newPassword = document.getElementById("editPassword").value;

    // Példa: Adatok frissítése (ide jönne a valós adatbázis művelet)
    document.getElementById("profileName").textContent = newName;
    document.getElementById("profileEmail").textContent = newEmail;
    alert("Adatok frissítve!");

    // Űrlap elrejtése
    document.getElementById("editProfileForm").classList.add("d-none");
});

// Kijelentkezés
document.getElementById("logoutButton").addEventListener("click", () => {
    // Példa: Kijelentkezési logika
    alert("Sikeresen kijelentkeztél!");
    window.location.href = "index.html"; // Átirányítás a főoldalra
});

// Oldal betöltésekor betöltjük a profil adatokat
window.onload = () => {
    loadProfile();
};