// ForgotPassword.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import * as actions from "../../Store/Actions/index";

import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";

const ForgotPassword = (props) => {
  // -----------USE STATES--------------
  const [email, setEmail] = useState("");

  // ------------USE EFFECTS-------------
  useEffect(() => {
    if (props.success) {
      toast.info("Token sent to Email!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
      props.onResetSuccessForAuth();
    }
  }, [props.success]);

  // ------------VARIABLE DECALARTIONS-----------------
  const navigate = useNavigate();

  // ---------HANDLERS------------

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    props.onForgotPassword(email);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center vh-100 ">
          <div className="form-container w-100">
            <div className="logo-container">Forgot Password</div>

            <form className="form" onSubmit={forgotPasswordHandler}>
              <div className="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {props.error.toLowerCase().includes("email") ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {props.error}
                </p>
              ) : null}
              <button className="form-submit-btn" type="submit">
                Send Email
              </button>
            </form>
            <button className="btn btn-danger" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.Auth.error,
    success: state.Auth.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onForgotPassword: (email) => {
      dispatch(actions.ForgotPassword(email));
    },
    onResetSuccessForAuth: () => {
      dispatch(actions.ResetSuccessForAuth());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
