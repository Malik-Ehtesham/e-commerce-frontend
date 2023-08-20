import axios from "axios";

import * as actionTypes from "./actionTypes";

export const PlaceOrderStart = () => {
  return { type: actionTypes.PLACE_ORDER_START };
};

export const PlaceOrderSuccess = (order, clearCart) => {
  clearCart();
  return { type: actionTypes.PLACE_ORDER_SUCCESS };
};

export const PlaceOrderFail = (error) => {
  return { type: actionTypes.PLACE_ORDER_FAIL, error };
};

export const PlaceOrder = (OrdersInformation, clearCart) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(PlaceOrderStart());
    axios
      .post(
        "https://e-commerce-backend-production-e87.up.railway.app/api/orders/",
        OrdersInformation,
        config
      )
      .then((res) => {
        dispatch(PlaceOrderSuccess(res.data, clearCart));
      })
      .catch((error) => {
        dispatch(PlaceOrderFail(error.response.data.message));
      });
  };
};

// -----RESET SUCCESS-----------
export const ResetSuccessForCheckout = () => {
  return { type: actionTypes.RESET_SUCCESS };
};
