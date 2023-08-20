import React, { useState } from "react";

import "./StarRatingCreate.css"; // Import your CSS for styling

const StarRating = (props) => {
  // ----------USE STATE---------
  const [rating, setRating] = useState(0);

  // --------HANDLERS
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    props.sendRatingToParent(selectedRating);
  };

  // COMPONENT
  return (
    <div className="star-rating">
      <p className="fs-5 m-3 ms-0">Rating:</p>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={` star ${rating >= value ? "filled" : ""}`}
          onClick={() => handleStarClick(value)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
