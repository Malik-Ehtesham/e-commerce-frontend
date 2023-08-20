import React from "react";

const ProductInOrder = (props) => {
  return (
    <div className="row d-flex">
      <div className="col-4 d-flex justify-content-center align-items-center">
        <img
          src={props.image}
          className="img-fluid border rounded-3 border-3 mx-1 mt-4 mb-1"
          style={{ width: "120px" }}
        />
      </div>
      <div className=" d-flex justify-content-center align-items-center col-5">
        <p className=" text-start mt-2">{`${props.title}...`}</p>
      </div>
      <div className=" d-flex justify-content-center align-items-center col-3">
        <span className="text-info fs-5 fw-semibold">
          QTY: {props.quantity}
        </span>
      </div>
      <hr />
    </div>
  );
};

export default ProductInOrder;
