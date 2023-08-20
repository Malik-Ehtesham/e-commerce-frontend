import React from "react";

import "./CheckoutFormProductCard.css";

const CheckoutFormProductCard = (props) => {
  return (
    <div className="row my-2">
      <div className="col-md-2 col-12 border border-secondary border-5 text-center">
        <img
          src={props.image}
          style={{ width: "200px", height: "200px" }}
          className="img-fluid img"
        />
      </div>
      <div className="col-md-6 col-12 text-start border border-secondary border-5">
        <div>
          <p className="fs-4 fw-semibold mt-2 overflow-hidden">
            {`${props.title}`}
          </p>
          <hr />
          <div className="d-flex">
            <p className="fw-bold fs-5">Qty :</p>
            <p className="fw-semibold mx-1 fs-5">{props.quantity}</p>
          </div>
          <hr />
          <p className="fs-4 fw-bolder text-danger">
            Rs. {Math.round(props.price)}
          </p>
        </div>
      </div>
      <div className="col-md-4 col-12 border border-secondary border-5">
        <div>
          <h4 className="text-decoration-underline">About The Product</h4>
          <p className="fs-5 lead truncated-text-checkout">{`${props.description}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFormProductCard;
