import React, { useEffect } from "react";
import { connect } from "react-redux";

import AccountBar from "../../Components/AccountBar/AccountBar";
import AccountSettings from "../../Components/AccountSettings/AccountSettings";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import YourOrders from "../../Components/YourOrders/YourOrders";
import YourProfilePage from "../../Components/YourProfilePage/YourProfilePage";
import Spinner from "../../Components/Spinner/Spinner";

import * as actions from "../../Store/Actions/index";

const AdminPanel = (props) => {
  // -------USE EFFECTS---------
  useEffect(() => {
    props.onFetchOrders();
  }, []);

  // ----------VARIABLE DECALARATIONS--------
  let pageContent;

  if (props.CurrentPage == "Profile") {
    pageContent = <YourProfilePage />;
  } else if (props.CurrentPage == "Orders") {
    pageContent = <YourOrders />;
  } else if (props.CurrentPage == "Settings") {
    pageContent = <AccountSettings />;
  }
  // COMPONENT
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <Navbar />
        <AccountBar />
      </div>
      <div className="container">
        <div className="row">
          {props.loading ? (
            <div className="col-12 d-flex  justify-content-center">
              <Spinner />
            </div>
          ) : (
            <div className=" col-12">{pageContent}</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    CurrentPage: state.AdminPanel.CurrentPage,
    loading: state.AdminPanel.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => {
      dispatch(actions.FetchOrders());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
