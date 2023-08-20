import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import * as actions from "../../Store/Actions/index";

import "./CartCard.css";

const CartCard = (props) => {
  // USESTATE

  // VARIABLE DECALARTIONS
  let disableDecrementButton;

  // HANDLERS

  const RemoveCartItemHandler = () => {
    props.onRemoveCartItem(props.id, toast);
  };

  const IncreaseQuantityHandler = () => {
    const newQuantity = props.quantity + 1;

    props.onUpdateCartItemQuantity(props.id, newQuantity);
  };

  const DecreaseQuantityHandler = () => {
    if (props.quantity > 1) {
      const newQuantity = props.quantity - 1;
      props.onUpdateCartItemQuantity(props.id, newQuantity);
    }
  };

  // COMPONENT

  if (props.quantity === 1) {
    disableDecrementButton = true;
  } else {
    disableDecrementButton = false;
  }
  return (
    <>
      <div className="col-md-6 col-12 my-1">
        <div>
          <div className="d-flex">
            <img
              src={props.image}
              className="img-fluid border rounded-3 border-3 mx-1 mt-4 mb-1"
              style={{ width: "120px", height: "120px" }}
            />
            <div className="d-flex flex-column mt-4 mb-1 overflow-hidden mx-2">
              <p className="fs-5  text-start truncated-text-cart-title">{`${props.title}`}</p>
              <p className="fs-5 lead text-start truncated-text-cart-desc">
                {`${props.description}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2 col-4 ps-4 my-1">
        <div className="d-flex justify-content-center my-5">
          <p
            className="border border-secondary border-1 px-2  py-0 fs-5 fw-bold"
            style={
              disableDecrementButton
                ? { cursor: "pointer", pointerEvents: "none" }
                : { cursor: "pointer" }
            }
            onClick={DecreaseQuantityHandler}
          >
            −
          </p>
          <p className="border border-1 border-dark px-3  py-0 fs-5 ">
            {props.quantity}
          </p>
          <p
            className="border border-secondary border-1 px-2 py-0 fs-5 fw-bold "
            style={{ cursor: "pointer" }}
            onClick={IncreaseQuantityHandler}
          >
            +
          </p>
        </div>
      </div>
      <div className="col-md-2 col-5 p-1 my-1">
        <div className="d-flex justify-content-center my-5">
          <p className="text-center fw-semibold text-danger fs-5">
            Rs.&nbsp;{Math.round(props.price)}
          </p>
        </div>
      </div>

      <div className="col-md-2 col-3 d-flex align-items-center justify-content-center my-1">
        <button className="btn btn-danger mb-3" onClick={RemoveCartItemHandler}>
          Remove
        </button>
      </div>
      <hr />
    </>
  );
};
// RESET THE CART AFTER SUCCESSFULL ORDER COMPLETE
const mapStateToProps = (state) => {
  return {
    Cart: state.Cart.Cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveCartItem: (itemId, toast) => {
      dispatch(actions.removeCartItem(itemId, toast));
    },
    onUpdateCartItemQuantity: (itemId, quantity) => {
      dispatch(actions.updateCartItemQuantity(itemId, quantity));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
