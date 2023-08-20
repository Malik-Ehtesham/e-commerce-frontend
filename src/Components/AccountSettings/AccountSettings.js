import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import * as actions from "../../Store/Actions/index";
import "react-toastify/dist/ReactToastify.css";
import ExitSvg from "../../utils/Icons/Exit.svg";

const AccountSettings = (props) => {
  // ----USE STATES------
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // -------------VARIABLE DECALARATIONS ---------
  let navigate = useNavigate();

  const strArray = props.error.split(". ");

  const dataForUpdatingPassword = {
    passwordCurrent: currentPassword,
    password: newPassword,
    passwordConfirm: passwordConfirm,
  };

  // --------USE EFFECTS----------

  // -------HANDLERS-----------

  const DeleteAccountHandler = () => {
    props.onDeleteAccount(props.onLogout, navigate, toast.info, toast.error);
  };

  const LogoutHandler = () => {
    props.onLogout();
    toast.info("Logged Out Successfully!", {
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
  };

  const UpdatePasswordHandler = (e) => {
    e.preventDefault();
    props.onPasswordUpdate(dataForUpdatingPassword, toast.success, toast.error);
  };

  return (
    <div className="container ">
      <div className="row my-3">
        <div className="col-12">
          <h1 className="text-center">Update Your Account</h1>
        </div>
      </div>
      <div className="row border-2  border border-secondary rounded-1">
        <form className="col-12">
          <div className="d-flex flex-column">
            <label className="fs-5">Current Password</label>
            <input
              type="password"
              className="p-1"
              placeholder="Enter Your Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {props.error ? (
              <p className="fs-6 m-0 text-danger fw-semibold">
                {strArray.filter((error) => error.includes("current"))}
              </p>
            ) : null}
          </div>
          <div className="d-flex flex-column my-3">
            <label className="fs-5">New Password</label>
            <input
              type="password"
              className="p-1"
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {props.error ? (
              <p className="fs-6 m-0 text-danger fw-semibold">
                {strArray.filter(
                  (error) =>
                    error.includes("provide") && error.includes("password")
                )}
                {strArray.filter((error) => error.includes("must"))}
              </p>
            ) : null}
          </div>{" "}
          <div className="d-flex flex-column my-3">
            <label className="fs-5">Password Confirm</label>
            <input
              type="password"
              className="p-1"
              placeholder="Confirm Your Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {props.error ? (
              <p className="fs-6 m-0 text-danger fw-semibold">
                {strArray.filter((error) => error.includes("match"))}
                {strArray.filter((error) => error.includes("confirm"))}
                {strArray.filter((error) => error.includes("changed"))}
              </p>
            ) : null}
          </div>
          <div className="d-flex justify-content-end my-2">
            <button
              className="btn btn-sm btn-primary fs-5"
              onClick={UpdatePasswordHandler}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
      <div className="row my-3">
        <div className="col-12 d-flex  justify-content-end">
          <button
            class="btn btn-danger d-flex   justify-content-center align-items-center mx-2"
            onClick={LogoutHandler}
          >
            <img
              src={ExitSvg}
              style={{ width: "40px" }}
              className="rounded-circle mx-1 img-fluid "
            />
            Logout
          </button>

          <button className="btn btn-danger" onClick={DeleteAccountHandler}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.Auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteAccount: (Logout, navigate, toastSuccess, toastError) => {
      dispatch(
        actions.DeleteAccount(Logout, navigate, toastSuccess, toastError)
      );
    },
    onLogout: () => {
      dispatch(actions.logout());
    },
    onPasswordUpdate: (dataForUpdatingPassword, toastSuccess, toastError) => {
      dispatch(
        actions.PasswordUpdate(
          dataForUpdatingPassword,
          toastSuccess,
          toastError
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
