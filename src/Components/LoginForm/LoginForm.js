import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

import * as actions from "../../Store/Actions/index";
import "./LoginForm.css";

const LoginForm = (props) => {
  // -----USE STATES-----------

  const [isSignup, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // -----VARIABLES DECALARATIONS-----------

  let navigate = useNavigate();

  const loginData = {
    email,
    password,
  };
  const token = localStorage.getItem("token");
  // // -----USE EFFECTS-----------

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  // // -----HANDLERS-----------

  const ChangeLoggedModeHandler = () => {
    setIsSignUp(!isSignup);
    navigate("/authenticate/Signup");
  };

  const LoginFormHandler = async (e) => {
    e.preventDefault();

    props.onAuth(loginData, isSignup);
  };

  // -------------------COMPONENT----------------

  return (
    <form
      className="container bg-light rounded-3 width shadow"
      onSubmit={LoginFormHandler}
    >
      <div className="row">
        <div className="col-12">
          <h3 className="text-center fw-bold my-3">Login</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column">
            <label className="fs-5 font-monospace mx-2">Email</label>
            <input
              className="border-bottom bg-none border-info border-top-0 border-start-0  border-end-0  m-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column">
            <label className="fs-5 font-monospace mx-2">Password</label>
            <input
              className="border-bottom bg-none border-info border-top-0 border-start-0  border-end-0  m-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
            {props.error.toLowerCase().includes("password") ? (
              <p className="fs-6 m-0 text-danger fw-semibold">{props.error}</p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-12 d-flex justify-content-center">
          <button className="btn btn-grad btn-sm fs-6 my-3">Login</button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <Link
            className="text-info text-decoration-underline text-center fs-6 fw-semibold "
            to="/forgotPassword"
            role="button"
          >
            Forgot Your password?
          </Link>
        </div>
        <div className="col-12">
          <p className="fs-6 fw-semibold my-2">
            Dont Have An Account?
            <strong
              className="text-info text-decoration-underline "
              role="button"
              onClick={ChangeLoggedModeHandler}
            >
              &nbsp;Create Now!
            </strong>
          </p>
        </div>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.Auth.token,
    error: state.Auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (data, isSignup) => {
      dispatch(actions.auth(data, isSignup));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
