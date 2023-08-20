import React from "react";

import "./StarRatingRead.css";

const StarRatingRead = ({ rating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star-read ${rating >= value ? "filled" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRatingRead;
