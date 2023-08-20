import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CartCard from "../CartCard/CartCard";
import * as actions from "../../Store/Actions/index";

const CartLayout = (props) => {
  // --------USE STATES----------

  const [totalPrice, setTotalPrice] = useState(0);

  // ---------VARIABLE DECALARTIONS-----------

  let navigate = useNavigate();

  // Logic For Total Price
  const CartProductPrices = [];
  props.Cart.map((CartItem) => {
    const PriceWithQuantity = CartItem.product.price * CartItem.quantity;
    return CartProductPrices.push(PriceWithQuantity);
  });
  const price = CartProductPrices.reduce(
    (Prevprice, CurrentPrice) => Prevprice + CurrentPrice,
    0
  );

  // -------USE EFFECTS----------

  useEffect(() => {
    setTotalPrice(price);
  }, [props.Cart]);

  // HANDLERS
  const ClearCartHandler = () => {
    props.onClearCart(toast);
  };

  const BuyingAllCartProducts = () => {
    props.onBuyingAllCartProducts();
  };

  // COMPONENT
  return (
    <div className="container">
      <div className="row border border-secondary border-5 rounded-3 mt-1 ">
        {props.Cart.map((CartProduct) => {
          return (
            <CartCard
              key={CartProduct._id}
              id={CartProduct._id}
              image={CartProduct.product.image}
              title={CartProduct.product.title}
              description={CartProduct.product.description}
              price={CartProduct.product.price}
              quantity={CartProduct.quantity}
            />
          );
        })}
      </div>
      <div className="row ">
        <div className="col-6 border border-secondary border-5 rounded-3 ">
          <p className="text-center fs-4 fw-bolder text-secondary">
            Total Price:
          </p>
          <p className="text-center fs-5 fw-semibold text-danger">
            Rs. {Math.round(totalPrice)}
          </p>
        </div>
        <div className="col-6 d-flex align-items-center flex-column justify-content-center border border-secondary border-5 rounded-3  ">
          <button className="btn btn-danger my-2" onClick={ClearCartHandler}>
            Remove All
          </button>
          <Link
            to={`/Checkout/${Math.round(totalPrice)}`}
            className="btn btn-primary my-2"
            onClick={BuyingAllCartProducts}
          >
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    Cart: state.Cart.Cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearCart: (toast) => {
      dispatch(actions.clearCart(toast));
    },
    onBuyingAllCartProducts: () => {
      dispatch(actions.BuyingAllCartProducts());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartLayout);
