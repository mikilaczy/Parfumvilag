// NewsAPI kulcs
const API_KEY = "001f49d7cbf241f1bfeed545c38a76c2";

// URL a parfüm hírekhez (12 találat)
const API_URL = `https://newsapi.org/v2/everything?q=perfume NOT (concert OR Genius OR novelist OR Trump OR Orders OR walmart OR habit OR Delicious OR PNOĒS OR Sophie OR Pizza OR Sci-Fi OR Logitech OR Watch OR Shoes OR Message OR Apothecary OR weekend OR Beauty OR Nightstand OR Reeves OR Shoe OR 韓国 OR Card OR Alba OR Apple OR Egyptian OR BWS OR Captain OR Recipe OR books OR Crossword OR rubbish OR Tea OR Candle OR Wine OR J-Pop OR robbers OR Newborn OR Bella OR Snacks OR Chronological OR Sexuality OR Stepsister OR Amazon OR Strange OR cheating)&language=en&sortBy=relevancy&apiKey=${API_KEY}`;

// DOM elemek
const newsContainer = document.getElementById("news-container");
const noResults = document.getElementById("noResults");

// Adatok lekérése és megjelenítése
async function fetchNews() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            // Csak az első 12 hírt jelenítjük meg
            data.articles.slice(0, 12).forEach(article => {
                const { title, description, url, urlToImage } = article;

                // Kártya létrehozása a perfume-card stílus alapján
                const newsCard = document.createElement("div");
                newsCard.classList.add("col-md-4", "col-sm-6", "col-12");

                newsCard.innerHTML = `
                    <div class="perfume-card">
                        ${urlToImage ? `<img src="${urlToImage}" alt="${title}" class="card-img-top" style="height: 220px; object-fit: cover;">` : '<img src="https://via.placeholder.com/220x220?text=Nincs+kép" alt="Nincs kép" class="card-img-top" style="height: 220px; object-fit: cover;">'}
                        <div class="perfume-card-body" style="min-height: 180px; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <h5 class="perfume-card-title" style="font-size: 1.6rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${title}</h5>
                                <p class="perfume-card-text" style="font-size: 0.95rem; height: 60px; overflow: hidden; text-overflow: ellipsis;">${description || "Nincs elérhető leírás."}</p>
                            </div>
                            <a href="${url}" target="_blank" class="btn btn-outline-primary">Tovább olvasom</a>
                        </div>
                    </div>
                `;

                // Kártya hozzáadása a konténerhez
                newsContainer.appendChild(newsCard);
            });
        } else {
            noResults.classList.remove("d-none");
        }
    } catch (error) {
        console.error("Hiba történt az adatok lekérése során:", error);
        noResults.innerHTML = `
            <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
            <h4>Hiba történt</h4>
            <p>A hírek betöltése nem sikerült. Kérlek, próbáld újra később!</p>
        `;
        noResults.classList.remove("d-none");
    }
}

// Oldal betöltésekor lekérjük a híreket
document.addEventListener("DOMContentLoaded", fetchNews);