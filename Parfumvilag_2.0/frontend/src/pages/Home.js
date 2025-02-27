import React from "react";
import PerfumeCard from "../components/PerfumeCard";

const Home = () => {
  const featuredPerfumes = [
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

  return (
    <div className="container">
      <div className="hero-section">
        <h1>Üdvözöljük a Parfümvilágban</h1>
        <p>
          Merülj el az illatok lenyűgöző világában, és találd meg a tökéletes
          parfümöt, amely kifejezi egyéniségedet.
        </p>
        <button className="btn btn-primary">Keresés indítása</button>
      </div>
      <div className="row" id="perfumeList">
        <h2>Kiemelt Parfümjeink</h2>
        {featuredPerfumes.map((p) => (
          <PerfumeCard key={p.id} perfume={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
