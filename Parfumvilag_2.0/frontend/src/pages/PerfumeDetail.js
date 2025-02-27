import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PerfumeCard from "../components/PerfumeCard";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const PerfumeDetail = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);

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

    const selectedPerfume = mockPerfumes.find((p) => p.id === parseInt(id));
    setPerfume(selectedPerfume);
  }, [id]);

  if (!perfume) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <PerfumeCard perfume={perfume} />
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <h2>Értékelések</h2>
          <ReviewForm perfumeId={perfume.id} />
          <ReviewList perfumeId={perfume.id} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <Link to="/kereses" className="btn btn-outline-primary">
            Vissza a kereséshez
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetail;
