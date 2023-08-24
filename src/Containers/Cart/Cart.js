import React, { useEffect } from "react";
import { connect } from "react-redux";

import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Spinner from "../../Components/Spinner/Spinner";
import CartLayout from "../../Components/CartLayout/CartLayout";

import * as actions from "../../Store/Actions/index";
import CartEmptyPng from "../../utils/Icons/empty-cart.png";

const Cart = (props) => {
  // VARIABLE DECALARATIONS

  const token = localStorage.getItem("token");
  // -------USE EFFECTS----------

  useEffect(() => {
    props.onFetchCart();
  }, []);
  useEffect(() => {
    props.onFetchCart();
  }, [token]);

  // ----------COMPONENT-----------
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <Navbar />
      </div>
      {token ? (
        props.loading ? (
          <Spinner />
        ) : props.Cart.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src={CartEmptyPng}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ) : (
          <CartLayout />
        )
      ) : (
        <h1 className="text-center border border-secondary border-3 rounded-pill m-3 p-3 bg-dark text-light">
          LOGIN To See Your Cart
        </h1>
      )}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.Cart.loading,
    Cart: state.Cart.Cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCart: () => dispatch(actions.FetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
