import React, { useEffect } from "react";
import { connect } from "react-redux";

import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Spinner from "../../Components/Spinner/Spinner";
import CartLayout from "../../Components/CartLayout/CartLayout";

import * as actions from "../../Store/Actions/index";

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
        <p className="text-center text-warning fs-4 text-decoration-underline fw-semibold">
          Your Cart
        </p>
      </div>
      {token ? (
        props.loading ? (
          <Spinner />
        ) : props.Cart.length === 0 ? (
          <h1 className="text-center border border-secondary border-3 rounded-pill m-3 p-3 bg-dark text-light">
            Your Cart Is Empty
          </h1>
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
