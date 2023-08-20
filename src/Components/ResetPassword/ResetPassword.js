import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as actions from "../../Store/Actions/index";

import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

const ResetPassword = (props) => {
  // ------------USE STATES-------------

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  // -------------USE EFFECTS----------------

  useEffect(() => {
    if (props.success) {
      toast.success("Password updated Successfully!", {
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

  // --------------VARIABLE DECALARATIONS----------------

  const { resetToken } = useParams();

  const strArray = props.error.split(". ");

  const resetPasswordData = {
    password: newPassword,
    passwordConfirm: newPasswordConfirm,
  };

  const navigate = useNavigate();

  // ------------HANDLERS-----------

  const ResetPasswordHandler = (e) => {
    e.preventDefault();
    props.onResetPassword(resetToken, resetPasswordData);
  };

  // -----COMPONENT-----------
  return (
    <div className="container">
      <div className="row"></div>
      <div className="col-12">
        <div class="login-box">
          <form onSubmit={ResetPasswordHandler}>
            <div class="user-box mb-2">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label>New Password</label>
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("8"))}
                  {strArray.filter((error) => error.includes("provide"))}
                </p>
              ) : null}
            </div>
            <div class="user-box">
              <input
                type="password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
              />
              <label>Password Confirm</label>
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("match"))}
                  {strArray.filter((error) => error.includes("confirm"))}
                </p>
              ) : null}
            </div>
            <center>
              <button className="btn">
                SEND
                <span></span>
              </button>
            </center>
          </form>
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
    onResetPassword: (resetToken, resetPasswordData) => {
      dispatch(actions.ResetPassword(resetToken, resetPasswordData));
    },

    onResetSuccessForAuth: () => {
      dispatch(actions.ResetSuccessForAuth());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
