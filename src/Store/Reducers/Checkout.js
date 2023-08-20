import * as actionTypes from "../Actions/actionTypes";

import { UpdateObject } from "./utility";

// -------INITIAL STATE-----------

const initialState = {
  loading: false,
  error: "",
  success: false,
};

// ---------PLACE ORDER---------

const PlaceOrderStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    success: false,
    error: "",
  });
};

const PlaceOrderSuccess = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    success: true,
    error: "",
  });
};

const PlaceOrderFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    success: false,
    error: action.error,
  });
};

// RESET SUCCESS
const ResetSuccessForCheckout = (state, action) => {
  return UpdateObject(state, {
    success: false,
  });
};

// MAIN REDUCER

const CheckoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLACE_ORDER_START:
      return PlaceOrderStart(state, action);
    case actionTypes.PLACE_ORDER_SUCCESS:
      return PlaceOrderSuccess(state, action);
    case actionTypes.PLACE_ORDER_FAIL:
      return PlaceOrderFail(state, action);
    case actionTypes.RESET_SUCCESS:
      return ResetSuccessForCheckout(state, action);
    default:
      return state;
  }
};
export default CheckoutReducer;
