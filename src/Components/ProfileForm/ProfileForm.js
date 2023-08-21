import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/index";

const ProfileForm = (props) => {
  // --------USESTATES----------

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedShippingAddress, setUpdatedShippingAddress] = useState("");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
  const [updatedCountry, setUpdatedCountry] = useState("");

  const [editProfile, setEditProfile] = useState(false);
  const [image, setImage] = useState(null);

  // --------VARIABLE DECALARATIONS---------

  const signupData = {
    username,
    email,
    shippingAddress,
    password,
    passwordConfirm,
  };

  const strArray = props.error.split(". ");

  //------------USE-EFFECTS--------------

  useEffect(() => {
    if (props.success) {
      setEditProfile(false);
      setUpdatedUsername("");
      setUpdatedPhoneNumber("");
      setUpdatedEmail("");
      setUpdatedCountry("");
      setUpdatedShippingAddress("");
      setImage(null);
    }
  }, [props.success]);

  // ------------HANDLERS------------

  const SignupDataHandler = (e) => {
    e.preventDefault();
    props.onAuth(signupData, true);
  };

  const UpdatingUserDataHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", updatedUsername);
    formData.append("email", updatedEmail);
    formData.append("photo", image);
    formData.append("shippingAddress", updatedShippingAddress);
    formData.append("phoneNumber", updatedPhoneNumber);
    formData.append("country", updatedCountry);

    props.onUpdatingUserData(formData);
  };

  // ---------COMPONENT---------

  return props.form === "Signup" ? (
    <>
      <form className="col-md-7 col-12 my-1" onSubmit={SignupDataHandler}>
        <div className=" border border-2 shadow rounded-1 ">
          <div className="row my-2 d-flex justify-content-center align-items-center mx-1">
            <div className="col-3-md col-4 fw-bolder fs-5  ">Username*</div>
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className="fs-5 overflow-auto border-1 "
                type="text"
                value={username}
                placeholder="Your Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("username"))}
                </p>
              ) : null}
            </div>
          </div>
          <hr className="my-3" />
          <div className="row my-2 d-flex justify-content-center align-items-center mx-1">
            <div className="col-3-md col-4 fw-bolder fs-5 ">
              Shipping Address*
            </div>
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className=" fs-5 overflow-auto border-1"
                type="address"
                value={shippingAddress}
                placeholder="Your Address"
                onChange={(e) => setShippingAddress(e.target.value)}
              />
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) =>
                    error.includes("shippingAddress")
                  )}
                </p>
              ) : null}
            </div>
          </div>
          <hr className="my-3" />
          <div className="row my-2 d-flex justify-content-center align-items-center mx-1">
            <div className="col-3-md col-4 fw-bolder fs-5 ">Email*</div>
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className=" fs-5 overflow-auto border-1"
                type="email"
                value={email}
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("email"))}
                </p>
              ) : null}
            </div>
          </div>
          <hr className="my-3" />

          <div className="row my-2 d-flex justify-content-center align-items-center mx-1">
            <div className="col-3-md col-4 fw-bolder fs-5 ">Password*</div>
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className=" fs-5 overflow-auto border-1"
                type="password"
                value={password}
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("`password`"))}
                </p>
              ) : null}
            </div>
          </div>
          <hr className="my-3" />
          <div className="row my-2 d-flex justify-content-center align-items-center mx-1">
            <div className="col-3-md col-4 fw-bolder fs-5 ">
              Password Confirm*
            </div>
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className=" fs-5 overflow-auto border-1"
                type="password"
                value={passwordConfirm}
                placeholder="Password Confirm"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("Confirm"))}
                </p>
              ) : null}
            </div>
          </div>
          <hr className="my-3" />
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center p-5 pb-0">
          <button className="btn-grad-Continue">Signup</button>
        </div>
      </form>
    </>
  ) : (
    <div className="container">
      <form
        className="row mt-5 border border-2 shadow rounded-1 "
        encType="multipart/form-data"
      >
        {/* <div className="col-12  d-flex flex-column justify-content-center align-items-center my-2">
          {editProfile ? (
            <>
              <input
                type="file"
                className="  fs-6 mt-2"
                style={{ width: "230px" }}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </>
          ) : (
            <img
              src={`/uploads/${props.user.photo}`}
              alt="Profile"
              type="image"
              style={{ width: "220px", height: "220px" }}
              className=" border border-3 rounded-3  img-fluid p-2"
              onError={(e) => {
                console.error("Error loading image:", e);
              }}
            />
          )}
        </div> */}
        <div className="row my-2">
          <div className="col-3-md col-4 fw-bolder fs-5  ">Username*</div>
          {editProfile ? (
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className="  fs-5 overflow-auto border-0"
                type="text"
                value={updatedUsername}
                placeholder="Your Username"
                onChange={(e) => setUpdatedUsername(e.target.value)}
              />
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("username"))}{" "}
                  {strArray.filter((error) => error.includes("changed"))}
                </p>
              ) : null}
            </div>
          ) : (
            <input
              className="col-9-md col-8  fs-5 overflow-auto border-0"
              type="text"
              value={props.user ? props.user.username : ""}
              readOnly
            />
          )}
        </div>
        <hr className="my-3" />
        <div className="row my-2">
          <div className="col-3-md col-4 fw-bolder fs-5  ">Email*</div>
          {editProfile ? (
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className="  fs-5 overflow-auto border-0"
                type="email"
                value={updatedEmail}
                placeholder="Your Email"
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("email"))}
                </p>
              ) : null}
            </div>
          ) : (
            <input
              className="col-9-md col-8  fs-5 overflow-auto border-0"
              type="email"
              value={props.user ? props.user.email : ""}
              readOnly
            />
          )}
        </div>
        <hr className="my-3" />

        <div className="row my-2">
          <div className="col-3-md col-4 fw-bolder fs-5 ">
            Shipping Address*
          </div>
          {editProfile ? (
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className="  fs-5 overflow-auto border-0"
                type="text"
                value={updatedShippingAddress}
                placeholder="Your Shipping Address"
                onChange={(e) => setUpdatedShippingAddress(e.target.value)}
              />
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) =>
                    error.includes("shippingAddress")
                  )}
                </p>
              ) : null}
            </div>
          ) : (
            <input
              className="col-9-md col-8  fs-5 overflow-auto border-0"
              type="text"
              value={props.user ? props.user.shippingAddress : ""}
              readOnly
            />
          )}
        </div>

        <hr className="my-3" />
        <div className="row my-2">
          <div className="col-3-md col-4 fw-bolder fs-5 ">Phone No.*</div>
          {editProfile ? (
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className="  fs-5 overflow-auto border-0"
                type="number"
                value={updatedPhoneNumber}
                placeholder="Your Phone No."
                onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
              />
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("phoneNumber"))}
                </p>
              ) : null}
            </div>
          ) : (
            <input
              className="col-9-md col-8  fs-5 overflow-auto border-0"
              type="text"
              value={
                props.user
                  ? !props.user.phoneNumber
                    ? "Undefined"
                    : props.user.phoneNumber
                  : ""
              }
              readOnly
            />
          )}
        </div>
        <hr className="my-3" />
        <div className="row my-2 ">
          <div className="col-3-md col-4 fw-bolder fs-5 ">Country</div>
          {editProfile ? (
            <div className="col-9-md col-8 d-flex flex-column">
              <input
                className=" fs-5 overflow-auto border-0"
                type="address"
                value={updatedCountry}
                placeholder="Your Country"
                onChange={(e) => setUpdatedCountry(e.target.value)}
              />
              {props.error ? (
                <p className="fs-6 m-0 text-danger fw-semibold">
                  {strArray.filter((error) => error.includes("country"))}
                </p>
              ) : null}
            </div>
          ) : (
            <input
              className="col-9-md col-8  fs-5 overflow-auto border-0"
              type="text"
              value={
                props.user
                  ? !props.user.country
                    ? "Undefined"
                    : props.user.country
                  : ""
              }
              readOnly
            />
          )}
        </div>
        <hr className="my-3" />
        <div className="row mt-2 mb-5 mt-4 ">
          {editProfile ? (
            <div className="col-12 d-flex  justify-content-end  p-0">
              <button
                type="button"
                className="btn btn-danger btn lg p-2 px-4 fs-4 mx-2"
                onClick={() => setEditProfile(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success btn lg p-2 px-4 fs-4 "
                onClick={UpdatingUserDataHandler}
              >
                Update
              </button>
            </div>
          ) : (
            <div className="col-12 d-flex  justify-content-end p-0">
              <button
                type="button"
                className="btn btn-warning btn lg p-2 px-4 fs-4 "
                onClick={() => setEditProfile(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.Auth.user,
    error: state.Auth.error,
    success: state.Auth.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatingUserData: (formData) => {
      dispatch(actions.updateUserData(formData));
    },

    onAuth: (data, isSignup) => {
      dispatch(actions.auth(data, isSignup));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
