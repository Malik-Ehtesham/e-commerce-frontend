import React from "react";
import { Link } from "react-router-dom";

import "./ProductCard.css";

const ProductCard = (props) => {
  return props.width <= 576 ? (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Link
        to={`/Product/${props.id}/${props.category}`}
        className="productCard my-1"
        style={{ width: "11.5rem" }}
      >
        <img
          src={props.image}
          className="img-fluid"
          style={{ height: "12rem" }}
          alt="Product"
        />
      </Link>
      <p className="card-title text-center fw-semibold truncated-text-mobile">
        {props.title}
      </p>
      <p className="text-danger fw-medium">Rs {Math.round(props.price)}</p>
    </div>
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Link
        to={`/Product/${props.id}/${props.category}`}
        className="productCard my-1"
        style={{ width: "11rem" }}
      >
        <img
          src={props.image}
          className="img-fluid"
          style={{ height: "14rem" }}
          alt="Product"
        />
      </Link>
      <p className="card-title text-center fw-semibold truncated-text">
        {props.title}
      </p>
      <p className="text-danger fw-medium">Rs {Math.round(props.price)}</p>
    </div>
  );
};

export default ProductCard;
