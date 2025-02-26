// Parfüm adatok
const perfumes = [
    { id: 1, name: "Chanel No. 5", brand: "Chanel", category: "Női", description: "Időtlen klasszikus, ikonikus virágos-aldehides illat.", scents: ["Virágos", "Aldehides"], price: 45000, image: "https://fimgs.net/himg/o.97897.jpg" },
    { id: 2, name: "Sauvage", brand: "Dior", category: "Férfi", description: "Friss, erőteljes, nyers és nemes összetevőkkel.", scents: ["Fás", "Fűszeres", "Friss"], price: 38000, image: "https://cdn.notinoimg.com/detail_main_mq/dior/3348901250153_01/sauvage___200828.jpg" },
    { id: 3, name: "Bloom", brand: "Gucci", category: "Női", description: "Intenzív virágos illat tele fehér virágokkal.", scents: ["Virágos", "Édes"], price: 42000, image: "https://th.bing.com/th/id/R.22fc95f9febfa7147cd1bf153d862a82?rik=FyGl0%2bm3nyMRqg&riu=http%3a%2f%2fyperfume.net%2fwp-content%2fuploads%2f2023%2f03%2fNuoc-hoa-Gucci-Bloom-Intense-Y-Perfume.jpg&ehk=Nwms3jcehpcExrOy%2fO2X8qr2QBNqn12molXzyLXH8ow%3d&risl=&pid=ImgRaw&r=0" },
    { id: 4, name: "Acqua di Giò", brand: "Armani", category: "Férfi", description: "Tengeri jegyekkel teli friss, vizes illat.", scents: ["Friss", "Citrusos", "Tengeri"], price: 36000, image: "https://www.leprofumeriegaetano.it/wp-content/uploads/2015/06/tester-acqua-di-gio-giorgio-armani-profumo.jpg?x45839" },
    { id: 5, name: "Bright Crystal", brand: "Versace", category: "Női", description: "Frissítő, virágos illat gránátalma jegyekkel.", scents: ["Virágos", "Gyümölcsös", "Friss"], price: 32000, image: "https://th.bing.com/th/id/R.bdfbe34f4140cb98dca8168db4084d84?rik=TLt7r5X1Fm9Ptw&riu=http%3a%2f%2fimages.chickadvisor.com%2fitem%2f1886%2foriginal%2fddde67d624901b942d19f4588e124eea.jpg&ehk=lrQq8WFO2KoNIxwguN9bIKhnwxNOhA%2f9PfAHWcUYSCA%3d&risl=&pid=ImgRaw&r=0" },
    { id: 6, name: "Eros", brand: "Versace", category: "Férfi", description: "Érzéki és erőteljes, mint a görög szerelem istene.", scents: ["Fás", "Orientális", "Fűszeres"], price: 34000, image: "https://static.dolce.pl/hires/13/24942.jpg" },
    { id: 7, name: "Miss Dior", brand: "Dior", category: "Női", description: "Elegáns virágos kompozíció párizsi stílusban.", scents: ["Virágos", "Citrusos"], price: 47000, image: "https://th.bing.com/th/id/OIP.xuKawrVfPkhpWjjWpi_1tgHaHa?rs=1&pid=ImgDetMain" },
    { id: 8, name: "Bleu de Chanel", brand: "Chanel", category: "Férfi", description: "Modern, karizmatikus illat fás-aromás jegyekkel.", scents: ["Fás", "Fűszeres", "Citrusos"], price: 49000, image: "https://www.perfumestationhk.com/wp-content/uploads/2022/12/cb100.jpeg" },
    { id: 9, name: "Si", brand: "Armani", category: "Női", description: "Modern, erős, de ugyanakkor finom illat.", scents: ["Virágos", "Gyümölcsös", "Édes"], price: 41000, image: "https://image.makewebeasy.net/makeweb/0/2q1fSqVKm/1product/0738.jpg" },
    { id: 10, name: "Le Male", brand: "Jean Paul Gaultier", category: "Férfi", description: "Ikonikus, friss és erőteljes illat tengerész stílusban.", scents: ["Orientális", "Fűszeres", "Friss"], price: 35000, image: "https://fimgs.net/mdimg/secundar/o.30429.jpg" },
    { id: 11, name: "Black Opium", brand: "Yves Saint Laurent", category: "Női", description: "Erőteljes és érzéki illat, kávé és vanília jegyekkel.", scents: ["Orientális", "Fűszeres", "Édes"], price: 44000, image: "https://cdn.shopify.com/s/files/1/0259/7733/products/black-opium-le-parfum-90ml_grande.png?v=1679625919" },
    { id: 12, name: "Aventus", brand: "Creed", category: "Férfi", description: "Luxus parfüm gyümölcsös és fás jegyekkel.", scents: ["Fás", "Gyümölcsös", "Fűszeres"], price: 95000, image: "https://th.bing.com/th/id/OIP.cewpyekWSZD6LowY4B9xSgHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain" },
    { id: 13, name: "CK One", brand: "Calvin Klein", category: "Unisex", description: "Friss, tiszta illat, amelyet mindenki viselhet.", scents: ["Citrusos", "Friss", "Virágos"], price: 28000, image: "https://fimgs.net/images/secundar/o.34674.jpg" },
    { id: 14, name: "Light Blue", brand: "Dolce & Gabbana", category: "Női", description: "A mediterrán nyár frissítő illata.", scents: ["Citrusos", "Friss", "Gyümölcsös"], price: 33000, image: "https://th.bing.com/th/id/R.0e7289cb8ad6152c659894f5816c771f?rik=ZIz0%2fSwBd95GIg&riu=http%3a%2f%2f4.static.fragrancenet.com%2fimages%2fphotos%2f900x900%2f120682.jpg&ehk=hs1WNIOYXvI%2f3KeZIpX79HF4fEufpZvZy%2bmJ5hihd2o%3d&risl=&pid=ImgRaw&r=0" },
    { id: 15, name: "Invictus", brand: "Paco Rabanne", category: "Férfi", description: "A győzelem illata, friss és fás jegyekkel.", scents: ["Fás", "Friss", "Fűszeres"], price: 31000, image: "https://fimgs.net/mdimg/secundar/o.52794.jpg" }
];

// DOM elemek
const perfumeDetails = document.getElementById('perfumeDetails');
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

// Ideiglenes tároló az értékeléseknek
const reviews = {};

// URL-ből az ID kinyerése és parfüm megjelenítése
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const perfumeId = parseInt(urlParams.get('id'));
    
    const perfume = perfumes.find(p => p.id === perfumeId);
    
    if (perfume) {
        displayPerfumeDetails(perfume);
        displayReviews(perfumeId);
        setupStarRatings();
    } else {
        perfumeDetails.innerHTML = '<p>Nincs ilyen parfüm az adatbázisban.</p>';
    }
});

// Csillagozási logika beállítása
function setupStarRatings() {
    document.querySelectorAll('.star-rating i').forEach(star => {
        star.addEventListener('click', function() {
            const ratingType = this.parentElement.dataset.type;
            const value = parseInt(this.dataset.value);
            const stars = this.parentElement.querySelectorAll('i');
            
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
            
            this.parentElement.dataset.rating = value;
        });
    });
}

// Értékelés beküldése
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const perfumeId = parseInt(urlParams.get('id'));
    
    const sillage = parseInt(document.querySelector('.star-rating[data-type="sillage"]').dataset.rating || 0);
    const longevity = parseInt(document.querySelector('.star-rating[data-type="longevity"]').dataset.rating || 0);
    const value = parseInt(document.querySelector('.star-rating[data-type="value"]').dataset.rating || 0);
    const overall = parseInt(document.querySelector('.star-rating[data-type="overall"]').dataset.rating || 0);
    const comment = document.getElementById('comment').value.trim();
    
    if (sillage === 0 || longevity === 0 || value === 0 || overall === 0 || !comment) {
        alert('Kérlek, értékeld mindegyik szempontot és adj meg egy megjegyzést!');
        return;
    }
    
    const review = {
        sillage,
        longevity,
        value,
        overall,
        comment,
        date: new Date().toLocaleString('hu-HU')
    };
    
    if (!reviews[perfumeId]) {
        reviews[perfumeId] = [];
    }
    reviews[perfumeId].push(review);
    
    reviewForm.reset();
    document.querySelectorAll('.star-rating').forEach(rating => {
        rating.dataset.rating = 0;
        rating.querySelectorAll('i').forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
    });
    displayReviews(perfumeId);
});

// Parfüm részletek megjelenítése
function displayPerfumeDetails(perfume) {
    const scentTags = perfume.scents.map(scent => 
        `<span class="scent-tag">${scent}</span>`
    ).join('');
    
    perfumeDetails.innerHTML = `
        <div class="col-md-6">
            <img src="${perfume.image}" alt="${perfume.name}" class="img-fluid rounded" style="max-height: 400px; object-fit: cover;">
        </div>
        <div class="col-md-6">
            <h2>${perfume.name}</h2>
            <h4>${perfume.brand}</h4>
            <p><strong>Kategória:</strong> ${perfume.category}</p>
            <p>${perfume.description}</p>
            <div class="mb-3">${scentTags}</div>
            <p class="price-display fs-4">${new Intl.NumberFormat('hu-HU').format(perfume.price)} Ft</p>
        </div>
    `;
}

// Értékelések megjelenítése
function displayReviews(perfumeId) {
    reviewsList.innerHTML = '';
    
    if (!reviews[perfumeId] || reviews[perfumeId].length === 0) {
        reviewsList.innerHTML = '<p>Még nincsenek értékelések ehhez a parfümhöz.</p>';
        return;
    }
    
    reviews[perfumeId].forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <div class="review-header">
                <div>Illatfelhő: ${'★'.repeat(review.sillage)}${'☆'.repeat(5 - review.sillage)}</div>
                <div>Tartósság: ${'★'.repeat(review.longevity)}${'☆'.repeat(5 - review.longevity)}</div>
                <div>Ár/Érték: ${'★'.repeat(review.value)}${'☆'.repeat(5 - review.value)}</div>
                <div>Összbenyomás: ${'★'.repeat(review.overall)}${'☆'.repeat(5 - review.overall)}</div>
            </div>
            <p class="review-comment">${review.comment}</p>
            <small class="text-muted">${review.date}</small>
        `;
        reviewsList.appendChild(reviewElement);
    });
}