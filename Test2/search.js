const perfumes = [
    { name: "Chanel No. 5", brand: "Chanel", price: 120, gender:"Női" },
    { name: "Dior Sauvage", brand: "Dior", price: 95, gender:"Női" },
    { name: "Gucci Bloom", brand: "Gucci", price: 110 , gender: "Női"},
    { name: "Versace Eros", brand: "Versace", price: 80, gender: "Férfi" },
    { name: "Chanel Coco Mademoiselle", brand: "Chanel", price: 130,gender:"Női" },
    { name: "Dior J'adore", brand: "Dior", price: 100, gender:"Női" },
    { name: "Gucci Guilty", brand: "Gucci", price: 90, gender:"Férfi" },
    { name: "Versace Bright Crystal", brand: "Versace", price: 75, gender:"Női" },
];


function displayPerfumes(perfumes) {
    const perfumeList = document.getElementById("perfumeList");
    perfumeList.innerHTML = ""; 

    perfumes.forEach(perfume => {
        const perfumeCard = `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2
            mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${perfume.name}</h5>
                        <p class="card-text">Márka: ${perfume.brand}</p>
                        <p class="card-text">Nem: ${perfume.gender} </p>
                        <p class="card-text">Ár: ${perfume.price} EUR</p>
                    </div>
                </div>
            </div>
        `;
        perfumeList.innerHTML += perfumeCard;
    });
}


function filterAndSort() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const filterBrand = document.getElementById("filterBrand").value;
    const filterPrice = document.getElementById("filterPrice").value;
    const sortBy = document.getElementById("sortBy").value;
    const filterGender = document.getElementById("filterGender").value;

    
    let filteredPerfumes = perfumes.filter(perfume => {
        const matchesSearch = perfume.name.toLowerCase().includes(searchText);
        const matchesGender = filterGender ? perfume.gender === filterGender : true;
        const matchesBrand = filterBrand ? perfume.brand === filterBrand : true;
        const matchesPrice = filterPrice ? (
            filterPrice === "0-50" ? perfume.price <= 50 :
            filterPrice === "50-100" ? perfume.price > 50 && perfume.price <= 100 :
            filterPrice === "100-150" ? perfume.price > 100 && perfume.price <= 150 :
            filterPrice === "150+" ? perfume.price > 150 : true
        ) : true;

        return matchesGender && matchesSearch && matchesBrand && matchesPrice;
    });

   
    if (sortBy === "priceAsc") {
        filteredPerfumes.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
        filteredPerfumes.sort((a, b) => b.price - a.price);
    } else if (sortBy === "nameAsc") {
        filteredPerfumes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "nameDesc") {
        filteredPerfumes.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayPerfumes(filteredPerfumes);
}

document.getElementById("searchInput").addEventListener("input", filterAndSort);
document.getElementById("filterBrand").addEventListener("change", filterAndSort);
document.getElementById("filterPrice").addEventListener("change", filterAndSort);
document.getElementById("sortBy").addEventListener("change", filterAndSort);
document.getElementById("filterGender").addEventListener("change", filterAndSort);


window.onload = () => displayPerfumes(perfumes);