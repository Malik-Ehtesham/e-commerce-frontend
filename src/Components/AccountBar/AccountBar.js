import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import YourOrdersPng from "../../utils/Icons/YourOrders.png";
import Default from "../../utils/Icons/profile.png";
import SettingSvg from "../../utils/Icons/setting.svg";
import * as actions from "../../Store/Actions/index";

const AccountBar = (props) => {
  const ChangeCurrentPageHandler = (CurrentPage) => {
    props.onChangeCurrentPage(CurrentPage);
  };

  const user = localStorage.getItem("user");
  return (
    <ul className="nav bg-dark">
      <li
        className="nav-item d-flex  p-1 justify-content-center align-items-center"
        onClick={() => ChangeCurrentPageHandler("Profile")}
      >
        <img
          alt="Profile"
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle img-fluid "
          src={Default}
        />
        <Link to="/AdminPanel/Profile" className="nav-link text-light">
          {user.length !== 0 ? `${user.username}` : "Your Profile"}
        </Link>
      </li>
      <li
        class="nav-item d-flex  p-1  justify-content-center align-items-center"
        onClick={() => ChangeCurrentPageHandler("Orders")}
      >
        <img
          src={YourOrdersPng}
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle img-fluid "
        />
        <Link to="/AdminPanel/MyOrders" className="nav-link text-light">
          Your Orders
        </Link>
      </li>
      <li
        className="nav-item d-flex  p-1  justify-content-center align-items-center"
        onClick={() => ChangeCurrentPageHandler("Settings")}
      >
        <img
          src={SettingSvg}
          style={{ width: "40px", height: "40px" }}
          className="rounded-circle img-fluid bg-white "
        />
        <Link to="/AdminPanel/AccountSettings" className="nav-link text-light">
          Account Settings
        </Link>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.Auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCurrentPage: (CurrentPage) => {
      dispatch(actions.ChangeCurrentPage(CurrentPage));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountBar);
