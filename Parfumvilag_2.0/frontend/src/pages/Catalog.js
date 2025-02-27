import React, { useState, useEffect } from "react";
import PerfumeCard from "../components/PerfumeCard";

const Catalog = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [activeFilters, setActiveFilters] = useState("");

  useEffect(() => {
    const mockPerfumes = [
      {
        id: 1,
        name: "Chanel No. 5",
        brand: "Chanel",
        category: "Női",
        description: "Időtlen klasszikus, ikonikus virágos-aldehides illat.",
        scents: ["Virágos", "Aldehides"],
        price: 45000,
        image: "https://fimgs.net/himg/o.97897.jpg",
      },
      {
        id: 2,
        name: "Sauvage",
        brand: "Dior",
        category: "Férfi",
        description: "Friss, erőteljes, nyers és nemes összetevőkkel.",
        scents: ["Fás", "Fűszeres", "Friss"],
        price: 38000,
        image:
          "https://cdn.notinoimg.com/detail_main_mq/dior/3348901250153_01/sauvage___200828.jpg",
      },
      {
        id: 3,
        name: "Black Opium",
        brand: "Yves Saint Laurent",
        category: "Női",
        description: "Erőteljes és érzéki illat, kávé és vanília jegyekkel.",
        scents: ["Orientális", "Fűszeres", "Édes"],
        price: 44000,
        image:
          "https://cdn.shopify.com/s/files/1/0259/7733/products/black-opium-le-parfum-90ml_grande.png?v=1679625919",
      },
    ];
    setPerfumes(mockPerfumes);
  }, []);

  const applyFilters = () => {
    const filtered = perfumes
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (p) => selectedBrands.length === 0 || selectedBrands.includes(p.brand)
      )
      .filter((p) => p.price <= maxPrice);

    setActiveFilters(getActiveFilters());
    setPerfumes(filtered);
  };

  const getActiveFilters = () => {
    const filters = [];
    if (searchTerm) filters.push(`Keresés: ${searchTerm}`);
    if (selectedBrands.length > 0)
      filters.push(`Márkák: ${selectedBrands.join(", ")}`);
    if (maxPrice < 100000)
      filters.push(
        `Max ár: ${new Intl.NumberFormat("hu-HU").format(maxPrice)} Ft`
      );
    return filters.join(", ");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
    setMaxPrice(100000);
    setActiveFilters("");
    setPerfumes([
      {
        id: 1,
        name: "Chanel No. 5",
        brand: "Chanel",
        category: "Női",
        description: "Időtlen klasszikus, ikonikus virágos-aldehides illat.",
        scents: ["Virágos", "Aldehides"],
        price: 45000,
        image: "https://fimgs.net/himg/o.97897.jpg",
      },
      {
        id: 2,
        name: "Sauvage",
        brand: "Dior",
        category: "Férfi",
        description: "Friss, erőteljes, nyers és nemes összetevőkkel.",
        scents: ["Fás", "Fűszeres", "Friss"],
        price: 38000,
        image:
          "https://cdn.notinoimg.com/detail_main_mq/dior/3348901250153_01/sauvage___200828.jpg",
      },
      {
        id: 3,
        name: "Black Opium",
        brand: "Yves Saint Laurent",
        category: "Női",
        description: "Erőteljes és érzéki illat, kávé és vanília jegyekkel.",
        scents: ["Orientális", "Fűszeres", "Édes"],
        price: 44000,
        image:
          "https://cdn.shopify.com/s/files/1/0259/7733/products/black-opium-le-parfum-90ml_grande.png?v=1679625919",
      },
    ]);
  };

  return (
    <div className="container">
      <div className="search-container">
        <h2>Keresés</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={applyFilters}
          >
            Keresés
          </button>
        </div>
        <div className="brand-filter">
          <h5>Márkák</h5>
          <div className="form-check">
            <input
              className="form-check-input brand-checkbox"
              type="checkbox"
              value="Chanel"
              id="brandChanel"
              onChange={(e) =>
                setSelectedBrands((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((b) => b !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="brandChanel">
              Chanel
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input brand-checkbox"
              type="checkbox"
              value="Dior"
              id="brandDior"
              onChange={(e) =>
                setSelectedBrands((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((b) => b !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="brandDior">
              Dior
            </label>
          </div>
          {/* További márkák */}
        </div>
        <div className="category-filter">
          <h5>Kategóriák</h5>
          <div className="form-check">
            <input
              className="form-check-input category-checkbox"
              type="checkbox"
              value="Női"
              id="categoryNői"
              onChange={(e) =>
                setSelectedBrands((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((b) => b !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="categoryNői">
              Női
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input category-checkbox"
              type="checkbox"
              value="Férfi"
              id="categoryFérfi"
              onChange={(e) =>
                setSelectedBrands((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((b) => b !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="categoryFérfi">
              Férfi
            </label>
          </div>
          {/* További kategóriák */}
        </div>
        <div className="scent-filter">
          <h5>Illat típus</h5>
          <div className="form-check">
            <input
              className="form-check-input scent-checkbox"
              type="checkbox"
              value="Virágos"
              id="scentVirágos"
              onChange={(e) =>
                setSelectedBrands((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((b) => b !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="scentVirágos">
              Virágos
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input scent-checkbox"
              type="checkbox"
              value="Fás"
              id="scentFás"
              onChange={(e) =>
                setSelectedBrands((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((b) => b !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="scentFás">
              Fás
            </label>
          </div>
          {/* További illat típusok */}
        </div>
        <div className="price-filter">
          <h5>Ár (Ft)</h5>
          <input
            type="range"
            className="form-range"
            id="priceRange"
            min="0"
            max="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
          <span>
            Maximum:{" "}
            <span id="priceValue">
              {new Intl.NumberFormat("hu-HU").format(maxPrice)}
            </span>{" "}
            Ft
          </span>
        </div>
        <div className="active-filters">{activeFilters}</div>
        <div className="btn-group">
          <button className="btn btn-outline-primary" onClick={applyFilters}>
            Szűrés alkalmazása
          </button>
          <button className="btn btn-outline-secondary" onClick={resetFilters}>
            Szűrők törlése
          </button>
        </div>
      </div>
      <div className="row" id="perfumeList">
        {perfumes.length === 0 ? (
          <div id="noResults">
            <i className="fas fa-search"></i>
            <h4>Nincs találat a keresési feltételeknek megfelelően</h4>
            <p>Próbálj meg kevesebb vagy más szűrőfeltételt beállítani</p>
          </div>
        ) : (
          perfumes.map((p) => <PerfumeCard key={p.id} perfume={p} />)
        )}
      </div>
    </div>
  );
};

export default Catalog;
