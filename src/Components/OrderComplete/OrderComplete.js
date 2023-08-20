import React from "react";
import { useNavigate } from "react-router-dom";

import "./OrderComplete.css";

import OrderCompleteImage from "../../utils/Icons/party.png";

import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";

const OrderComplete = (props) => {
  // -----------VARIABLE DECALARATIONS-----------

  const navigate = useNavigate();

  // -------COMPONENT---------

  return props.loading ? (
    <Spinner />
  ) : (
    <div className="container bg-light">
      <div className="row  my-2">
        <div className="col-12 d-flex justify-content-center">
          <img src={OrderCompleteImage} style={{ width: "180px" }} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="text-center fs-2 fw-bolder mb-0">
            Your Order Is Complete!
          </p>

          <p className="text-center mt-0 lead">
            You Will Be Receiving A Confirmation Email With Details.
          </p>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-12 d-flex  justify-content-center">
          <button
            className="btn btn-grad-Continue"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.Checkout.loading,
  };
};
export default connect(mapStateToProps)(OrderComplete);
