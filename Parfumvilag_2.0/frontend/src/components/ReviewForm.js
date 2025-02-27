import React, { useState } from "react";

const ReviewForm = ({ perfumeId }) => {
  const [sillage, setSillage] = useState(0);
  const [longevity, setLongevity] = useState(0);
  const [value, setValue] = useState(0);
  const [overall, setOverall] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sillage && longevity && value && overall && comment) {
      // Ide kerül a backend hívás
      alert("Értékelés elküldve!");
      setSillage(0);
      setLongevity(0);
      setValue(0);
      setOverall(0);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="star-rating" data-type="sillage">
        <i
          className={`fas fa-star ${sillage >= 1 && "checked"}`}
          onClick={() => setSillage(1)}
        />
        <i
          className={`fas fa-star ${sillage >= 2 && "checked"}`}
          onClick={() => setSillage(2)}
        />
        <i
          className={`fas fa-star ${sillage >= 3 && "checked"}`}
          onClick={() => setSillage(3)}
        />
        <i
          className={`fas fa-star ${sillage >= 4 && "checked"}`}
          onClick={() => setSillage(4)}
        />
        <i
          className={`fas fa-star ${sillage >= 5 && "checked"}`}
          onClick={() => setSillage(5)}
        />
      </div>
      <div className="star-rating" data-type="longevity">
        <i
          className={`fas fa-star ${longevity >= 1 && "checked"}`}
          onClick={() => setLongevity(1)}
        />
        <i
          className={`fas fa-star ${longevity >= 2 && "checked"}`}
          onClick={() => setLongevity(2)}
        />
        <i
          className={`fas fa-star ${longevity >= 3 && "checked"}`}
          onClick={() => setLongevity(3)}
        />
        <i
          className={`fas fa-star ${longevity >= 4 && "checked"}`}
          onClick={() => setLongevity(4)}
        />
        <i
          className={`fas fa-star ${longevity >= 5 && "checked"}`}
          onClick={() => setLongevity(5)}
        />
      </div>
      <div className="star-rating" data-type="value">
        <i
          className={`fas fa-star ${value >= 1 && "checked"}`}
          onClick={() => setValue(1)}
        />
        <i
          className={`fas fa-star ${value >= 2 && "checked"}`}
          onClick={() => setValue(2)}
        />
        <i
          className={`fas fa-star ${value >= 3 && "checked"}`}
          onClick={() => setValue(3)}
        />
        <i
          className={`fas fa-star ${value >= 4 && "checked"}`}
          onClick={() => setValue(4)}
        />
        <i
          className={`fas fa-star ${value >= 5 && "checked"}`}
          onClick={() => setValue(5)}
        />
      </div>
      <div className="star-rating" data-type="overall">
        <i
          className={`fas fa-star ${overall >= 1 && "checked"}`}
          onClick={() => setOverall(1)}
        />
        <i
          className={`fas fa-star ${overall >= 2 && "checked"}`}
          onClick={() => setOverall(2)}
        />
        <i
          className={`fas fa-star ${overall >= 3 && "checked"}`}
          onClick={() => setOverall(3)}
        />
        <i
          className={`fas fa-star ${overall >= 4 && "checked"}`}
          onClick={() => setOverall(4)}
        />
        <i
          className={`fas fa-star ${overall >= 5 && "checked"}`}
          onClick={() => setOverall(5)}
        />
      </div>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Megjegyzés"
        required
      />
      <button type="submit" className="btn btn-primary">
        Értékelés beküldése
      </button>
    </form>
  );
};

export default ReviewForm;
