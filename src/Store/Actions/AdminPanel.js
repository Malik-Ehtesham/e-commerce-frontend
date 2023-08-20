import axios from "axios";

import * as actionTypes from "./actionTypes";

// -------CHANGE CURRENT PAGE---------

export const ChangeCurrentPage = (CurrentPage) => {
  return { type: actionTypes.CHANGE_CURRENT_PAGE, CurrentPage: CurrentPage };
};

// -------FETCH ORDERS-------------

const FetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};

const FetchOrdersSuccess = (Orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    Orders,
  };
};

const FetchOrdersFail = (error) => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error };
};

export const FetchOrders = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    dispatch(FetchOrdersStart());
    axios
      .get(
        "https://e-commerce-backend-production-e87.up.railway.app/api/orders/my-orders",
        config
      )
      .then((res) => {
        dispatch(FetchOrdersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchOrdersFail(err.response.data.message));
      });
  };
};
