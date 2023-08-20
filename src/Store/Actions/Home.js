import * as actionType from "./actionTypes";

import axios from "axios";

// ------------FETCH ALL PRODUCTS--------------
export const FetchAllProductsStart = () => {
  return { type: actionType.FETCH_ALL_PRODUCTS_START };
};

export const FetchAllProductsSuccess = (allProducts) => {
  return {
    type: actionType.FETCH_ALL_PRODUCTS_SUCCESS,
    allProducts,
  };
};

export const FetchAllProductsFail = (error) => {
  return { type: actionType.FETCH_ALL_PRODUCTS_FAIL, error: error };
};

export const FetchAllProducts = () => {
  return (dispatch) => {
    dispatch(FetchAllProductsStart());
    axios
      .get(
        "https://e-commerce-backend-production-e87.up.railway.app/api/products"
      )
      .then((res) => dispatch(FetchAllProductsSuccess(res.data.allProducts)))
      .catch((error) => dispatch(FetchAllProductsFail(error)));
  };
};
