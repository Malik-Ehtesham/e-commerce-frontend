import axios from "axios";

import * as actionTypes from "./actionTypes";

export const BuyingSingleProduct = () => {
  return { type: actionTypes.BUYING_SINGLE_PRODUCT };
};

export const BuyingAllCartProducts = () => {
  return { type: actionTypes.BUYING_ALL_CART_PRODUCTS };
};

// --------------FETCHING SINGLE PRODUCT DATA------------

export const FetchSingleProductStart = () => {
  return { type: actionTypes.FETCH_SINGLE_PRODUCT_START };
};

export const FetchSingleProductSuccess = (SingleProduct) => {
  return {
    type: actionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
    SingleProduct: SingleProduct,
  };
};

export const FetchSingleProductFail = () => {
  return { type: actionTypes.FETCH_SINGLE_PRODUCT_FAIL };
};

export const FetchSingleProduct = (id) => {
  return (dispatch) => {
    dispatch(FetchSingleProductStart());
    axios
      .get(
        `https://e-commerce-backend-production-e87.up.railway.app/api/products/${id}`
      )
      .then((res) => {
        dispatch(FetchSingleProductSuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchSingleProductFail(err));
      });
  };
};
