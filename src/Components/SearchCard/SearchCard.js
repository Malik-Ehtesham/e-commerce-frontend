import React from "react";

const SearchCard = (props) => {
  return (
    <div className="card overflow-hidden">
      <div className="card-body overflow-hidden">
        <p>{props.title}</p>
      </div>
    </div>
  );
};

export default SearchCard;
