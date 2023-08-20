import React from "react";

import ProductInOrder from "../ProductInOrder/ProductInOrder";

const YourOrdersCard = (props) => {
  return (
    <div className="row  m-2">
      <p className="text-info fw-semibold m-2">Order Id: {props.id}</p>
      <div className="col-12 col-lg-8 my-2 ">
        {props.products.map((ProductAndQuantity) => {
          return (
            <ProductInOrder
              quantity={ProductAndQuantity.quantity}
              title={ProductAndQuantity.product.title}
              image={ProductAndQuantity.product.image}
            />
          );
        })}
      </div>
      <div className="col-12 col-lg-4 d-flex justify-content-evenly align-items-center mt-3 ">
        <div className=" ">
          {props.status === "placed" ? (
            <span className="badge text-bg-primary p-2 fs-6 mb-3">
              {props.status}
            </span>
          ) : null}
          {props.status === "shipped" ? (
            <span className="badge text-bg-info  p-2 fs-6  mb-3">
              {props.status}
            </span>
          ) : null}
          {props.status === "delivered" ? (
            <span className="badge text-bg-success  p-2 fs-6  mb-3">
              {props.status}
            </span>
          ) : null}
          {props.status === "cancelled" ? (
            <span className="badge text-bg-danger  p-2 fs-6  mb-3">
              {props.status}
            </span>
          ) : null}
        </div>
        <div className="">
          <p className="text-center fw-semibold text-info fs-5">
            Total price: {props.totalPrice}
          </p>
        </div>
      </div>
      <hr className="border-bottom border-3 border-primary my-2" />
    </div>
  );
};

export default YourOrdersCard;
