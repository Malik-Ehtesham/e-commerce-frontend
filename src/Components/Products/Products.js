import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../Spinner/Spinner";
import Slider from "../Slider/Slider";

import { ProductsUtility } from "../../UtilityFunctions/ProductsUtility";
import * as actions from "../../Store/Actions/index";

<link
  href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
  rel="stylesheet"
></link>;

const Products = (props) => {
  // ----------USE STATES------------
  const [width, setWidth] = useState(0);

  // -------------USE EFFECT-------------

  useEffect(() => {
    props.onFetchAllProducts();
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
  });

  // -------COMPONENT---------
  return props.loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Slider width={width} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h1 className="text-center fw-bold my-2">PRODUCTS</h1>
          </div>
        </div>

        {/* CLOTHING PRODUCTS */}

        {ProductsUtility("clothing", props.allProducts, width)}

        {/* ELECTRONICS PRODUCTS */}

        {ProductsUtility("electronics", props.allProducts, width)}

        {/* JEWELERY PRODUCTS */}

        {ProductsUtility("jewelery", props.allProducts, width)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.Home.allProducts,
    loading: state.Home.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAllProducts: () => dispatch(actions.FetchAllProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
