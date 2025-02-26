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
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const filterButton = document.getElementById('filterButton');
const resetButton = document.getElementById('resetButton');
const perfumeList = document.getElementById('perfumeList');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const activeFilters = document.getElementById('activeFilters');
const resultCount = document.getElementById('resultCount');
const noResults = document.getElementById('noResults');

// Ár csúszka
priceRange.addEventListener('input', function() {
    priceValue.textContent = new Intl.NumberFormat('hu-HU').format(this.value);
});

// Összes parfüm megjelenítése kezdéskor
window.addEventListener('DOMContentLoaded', () => {
    displayPerfumes(perfumes);
});

// Szűrés gomb eseménykezelő
filterButton.addEventListener('click', applyFilters);

// Keresés gomb eseménykezelő
searchButton.addEventListener('click', applyFilters);

// Enter lenyomása a keresési mezőben
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        applyFilters();
    }
});

// Szűrők törlése gomb
resetButton.addEventListener('click', resetFilters);

// Parfümök megjelenítése
function displayPerfumes(perfumesToShow) {
    perfumeList.innerHTML = '';
    resultCount.textContent = `(${perfumesToShow.length})`;
    
    if (perfumesToShow.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    perfumesToShow.forEach(perfume => {
        const perfumeCard = document.createElement('div');
        perfumeCard.className = 'col-lg-4 col-md-6';
        
        const scentTags = perfume.scents.map(scent => 
            `<span class="scent-tag">${scent}</span>`
        ).join('');
        
        perfumeCard.innerHTML = `
            <div class="perfume-card">
                <img src="${perfume.image}" alt="${perfume.name}">
                <div class="perfume-card-body">
                    <h5 class="perfume-card-title">${perfume.name}</h5>
                    <h6 class="mb-2">${perfume.brand}</h6>
                    <div class="mb-2">${scentTags}</div>
                    <p class="perfume-card-text">${perfume.description}</p>
                    <p class="price-display">${new Intl.NumberFormat('hu-HU').format(perfume.price)} Ft</p>
                    
                </div>
                <a href="perfumes.html?id=${perfume.id}" class="perfume-card-link" data-id="${perfume.id}"></a>
            </div>
        `;
        
        perfumeList.appendChild(perfumeCard);
    });
}

// Szűrők alkalmazása
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const maxPrice = parseInt(priceRange.value) || Infinity;

    const selectedBrands = Array.from(document.querySelectorAll('.brand-checkbox:checked'))
        .map(checkbox => checkbox.value);

    const selectedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked'))
        .map(checkbox => checkbox.value);

    const selectedScents = Array.from(document.querySelectorAll('.scent-checkbox:checked'))
        .map(checkbox => checkbox.value);

    const filteredPerfumes = perfumes.filter(perfume => {
        const matchesSearch = searchTerm === '' || 
            perfume.name.toLowerCase().includes(searchTerm) || 
            perfume.brand.toLowerCase().includes(searchTerm);
        
        const matchesPrice = perfume.price <= maxPrice;
        
        const matchesBrand = selectedBrands.length === 0 || 
            selectedBrands.includes(perfume.brand);
        
        const matchesCategory = selectedCategories.length === 0 || 
            selectedCategories.includes(perfume.category);
        
        const matchesScents = selectedScents.length === 0 || 
            selectedScents.some(scent => perfume.scents.includes(scent));
        
        return matchesSearch && matchesPrice && matchesBrand && matchesCategory && matchesScents;
    });

    updateActiveFilters(selectedBrands, selectedCategories, selectedScents, maxPrice);
    displayPerfumes(filteredPerfumes);
}

// Aktív szűrők frissítése
function updateActiveFilters(brands, categories, scents, maxPrice) {
    activeFilters.innerHTML = '';
    if (brands.length > 0) activeFilters.innerHTML += `Márkák: ${brands.join(', ')}<br>`;
    if (categories.length > 0) activeFilters.innerHTML += `Kategóriák: ${categories.join(', ')}<br>`;
    if (scents.length > 0) activeFilters.innerHTML += `Illatok: ${scents.join(', ')}<br>`;
    if (maxPrice !== Infinity) activeFilters.innerHTML += `Max ár: ${new Intl.NumberFormat('hu-HU').format(maxPrice)} Ft`;
}

// Szűrők törlése
function resetFilters() {
    searchInput.value = '';
    priceRange.value = priceRange.max;
    priceValue.textContent = new Intl.NumberFormat('hu-HU').format(priceRange.max);
    document.querySelectorAll('.brand-checkbox:checked').forEach(cb => cb.checked = false);
    document.querySelectorAll('.category-checkbox:checked').forEach(cb => cb.checked = false);
    document.querySelectorAll('.scent-checkbox:checked').forEach(cb => cb.checked = false);
    activeFilters.innerHTML = '';
    displayPerfumes(perfumes);
}