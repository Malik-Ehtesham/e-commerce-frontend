import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ProfileForm from "../ProfileForm/ProfileForm";

const SignupForm = (props) => {
  // ------VARIABLE DECALARATIONS-----------

  let navigate = useNavigate();

  const token = localStorage.getItem("token");

  // -------USE EFFECTS----------

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  // -----COMPONENT--------
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <ProfileForm form="Signup" />
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <p className="d-flex fs-6 fw-semibold">
              Already Have An Account?
              <strong
                className="text-primary fs-6 fw-bold mx-1"
                onClick={() => navigate("/authenticate/Login")}
                style={{ cursor: "pointer" }}
              >
                Login Now!
              </strong>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.Auth.token,
    localId: state.Auth.localId,
  };
};

export default connect(mapStateToProps)(SignupForm);
