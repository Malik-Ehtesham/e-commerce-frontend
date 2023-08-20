import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Cart from "../../utils/Icons/Cart.svg";
import Default from "../../utils/Icons/profile.png";

import * as actions from "../../Store/Actions/index";

import "./Navbar.css";

const Navbar = (props) => {
  // --------USE STATES---------

  const [searchBar, setSearchbar] = useState("");

  // ---------VARIABLES DECALARATIONS-----------

  let navigate = useNavigate();

  const SearchedProductsArray = props.allProducts.filter((SingleProduct) => {
    return SingleProduct.title.toLowerCase().includes(searchBar);
  });

  // ------HANDLERS---------

  const SearchBarHandler = (e) => {
    setSearchbar(e.target.value);
  };

  const SearchHandler = (e) => {
    e.preventDefault();
    if (searchBar !== "") {
      return (
        props.onSearch(SearchedProductsArray, searchBar),
        navigate("/SearchedProducts"),
        setSearchbar("")
      );
    }
  };
  const token = localStorage.getItem("token");
  // ------COMPONENT---------
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-primary py-2">
        <div className="container-fluid">
          <h1 className="display-5 text-light fw-semibold mx-2 me-5">
            Shop-It
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 ms-0 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link  link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link  link" to="/Cart">
                  <img
                    src={Cart}
                    alt="Cart"
                    style={{ width: "30px", marginRight: "5px" }}
                  />
                  Cart
                </Link>
              </li>

              <li className="nav-item">
                {token ? (
                  <Link to="/AdminPanel/Profile" className=" d-flex mx-1 my-2">
                    {/* {props.user.image ? (
                      <img
                        src={props.user.image}
                        className="border border-3 rounded-circle  bg-light"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      <img
                        src={`/userImages/${props.user.photo}`}
                        className="border border-3 rounded-circle bg-light"
                        style={{ width: "50px", height: "50px" }}
                      />
                    )} */}
                    <img
                      src={Default}
                      className="border border-3 rounded-circle bg-light"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                ) : (
                  <Link
                    to="/authenticate/Login"
                    className="btn text-light fs-5 fw-semibold text-center mx-1 my-2 glow-on-hover"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
            <div className="d-flex flex-column mt-1 my-1">
              <form className="d-flex flex-column mt-1 my-1" role="search">
                <div className="d-flex">
                  <input
                    className="form-control me-2 "
                    type="search"
                    placeholder="Search For Products"
                    aria-label="Search"
                    value={searchBar}
                    onChange={(e) => {
                      SearchBarHandler(e);
                    }}
                  />
                  <button
                    className="btn btn-outline-dark"
                    onClick={(e) => SearchHandler(e)}
                  >
                    Search
                  </button>
                </div>
                {searchBar !== "" ? (
                  <div className=" Position ">
                    <div className="Background ">
                      {SearchedProductsArray.map((SearchedProduct) => {
                        return (
                          <>
                            <Link
                              to={`/Product/${SearchedProduct.id}/${SearchedProduct.category}`}
                              className="Item"
                              onClick={() => setSearchbar("")}
                            >
                              {SearchedProduct.title.substring(0, 35)}
                            </Link>
                            <hr className="my-2" />
                          </>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // token: state.Auth.token,
    user: state.Auth.user,
    allProducts: state.Home.allProducts,
    loading: state.AdminPanel.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (SearchedProducts, searchBar) => {
      dispatch(actions.Search(SearchedProducts, searchBar));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
