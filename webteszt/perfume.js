
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const perfumeId = urlParams.get('id');

    const perfumes = [
        {
            id: 1,
            name: "Chanel No. 5",
            brand: "Chanel",
            price: 80,
            gender: "Női",
            type: "Floral",
            image: "https://th.bing.com/th/id/OIP.7Y30Y-UXmKzQaDii8fqoVQHaLH?rs=1&pid=ImgDetMain.com/300x300?text=Chanel+No.+5",
            description: "A Chanel No. 5 egy ikonos női parfüm, amely 1921-ben jelent meg. A parfüm egyedi illatot ad, amelyet a fűszeres és virágzatos illatok kombinációja alakít ki."
        },
        {
            id: 2,
            name: "Dior J'adore",
            brand: "Dior",
            price: 100,
            gender: "Női",
            type: "Floral",
            image: "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_1800,c_limit/e_trim/v1/imagens/product/42220/4a8eb153-0bd1-4651-9427-b85d297a0834-jadore-dior-eau-de-parfum-perfume-feminino.png",
            description: "A Dior J'adore egy luxusos női parfüm, amely a virágzatos illatokat és a frissítő elemeket kombinálja. A parfüm elegáns és fényes illatot ad."
        },
        {
            id: 3,
            name: "Gucci Guilty Elixir",
            brand: "Gucci",
            price: 120,
            gender: "Férfi",
            type: "Woody",
            image: "https://media.gucci.com/style/DarkGray_Center_0_0_980x980/1690978676/765589_99999_0099_002_100_0000_Light-Gucci-Guilty-Elixir-de-Parfum-Pour-Homme-60ml.jpg",
            description: "A Gucci Guilty Elixir egy férfi parfüm, amely virágzatos és fűszeres illatokat kombinál. A parfüm modern és izgalmas illatot ad."
        },
        {
            id: 4,
            name: "Versace Eros",
            brand: "Versace",
            price: 90,
            gender: "Férfi",
            type: "Spicy",
            image: "https://static.dolce.pl/hires/13/24942.jpg",
            description: "A Versace Eros egy férfi parfüm, amely fűszeres és spici illatokat kombinál. A parfüm izgalmas és domináns illatot ad."
        }
    ];

    const perfume = perfumes.find(p => p.id == perfumeId);

    if (perfume) {
        document.getElementById('perfumeImage').src = perfume.image;
        document.getElementById('perfumeName').textContent = perfume.name;
        document.getElementById('perfumeBrand').textContent = `Márka: ${perfume.brand}`;
        document.getElementById('perfumeGender').textContent = `Nem: ${perfume.gender}`;
        document.getElementById('perfumePrice').textContent = `Ár: ${perfume.price} EUR`;
        document.getElementById('perfumeType').textContent = `Illatcsalád: ${perfume.type}`;
        document.getElementById('perfumeDescription').textContent = perfume.description;
    } else {
        document.getElementById('perfumeName').textContent = "Parfüm nem található";
        document.getElementById('perfumeBrand').textContent = "";
        document.getElementById('perfumeGender').textContent = "";
        document.getElementById('perfumePrice').textContent = "";
        document.getElementById('perfumeType').textContent = "";
        document.getElementById('perfumeDescription').textContent = "A keresett parfüm nem található.";
    }

    document.getElementById('displayYear').textContent = new Date().getFullYear();

    // Range inputok értékének frissítése
    const rangeInputs = document.querySelectorAll('.form-range');
    rangeInputs.forEach(input => {
        const valueSpan = document.getElementById(`${input.id}Value`);
        valueSpan.textContent = input.value;
        input.addEventListener('input', function() {
            valueSpan.textContent = this.value;
        });
    });

    // Értékelések tárolása
    let reviews = [];

    // Értékelés küldése
    const ratingForm = document.getElementById('ratingForm');
    const reviewsContainer = document.getElementById('reviewsContainer');

    ratingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const persistence = document.getElementById('ratingPersistence').value;
        const intensity = document.getElementById('ratingIntensity').value;
        const valueForMoney = document.getElementById('ratingValueForMoney').value;
        const overall = document.getElementById('ratingOverall').value;
        const comment = document.getElementById('reviewComment').value.trim();

        if (!username || !comment) {
            alert('Kérjük, add meg a neved és a véleményed!');
            return;
        }

        const review = {
            username: username,
            persistence: persistence,
            intensity: intensity,
            valueForMoney: valueForMoney,
            overall: overall,
            comment: comment
        };

        reviews.push(review);
        renderReviews();

        alert('Köszönjük az értékelést!');
        ratingForm.reset();
    });

    // Értékelések megjelenítése
    function renderReviews() {
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review';
            reviewDiv.innerHTML = `
                <div class="review-header">${review.username}</div>
                <div class="review-rating">
                    Tartósság: ${review.persistence}, Illatintenszitás: ${review.intensity}, Ár-érték arány: ${review.valueForMoney}, Összesített Érték: ${review.overall}
                </div>
                <div class="review-comment">${review.comment}</div>
            `;
            reviewsContainer.appendChild(reviewDiv);
        });
    }
});


