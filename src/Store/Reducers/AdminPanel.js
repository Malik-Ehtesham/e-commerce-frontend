import * as actionTypes from "../Actions/actionTypes";

import { UpdateObject } from "./utility";

// ----INITIAL STATE--------
const initialState = {
  Orders: [],
  CurrentPage: "Profile",
  loading: false,
  OrdersInProgress: [],
  CancelledOrders: [],
  error: "",
};
// --------HELPER FUNCTIONS-----------

const ChangeCurrentPage = (state, action) => {
  return UpdateObject(state, {
    CurrentPage: action.CurrentPage,
  });
};

// ------FETCH ORDERS------------

const FetchOrdersStart = (state, action) => {
  return UpdateObject(state, { Orders: [], loading: true, error: "" });
};

const FetchOrdersSuccess = (state, action) => {
  return UpdateObject(state, {
    Orders: action.Orders,
    loading: false,
    error: "",
  });
};
const FetchOrdersFail = (state, action) => {
  return UpdateObject(state, {
    Orders: [],
    loading: false,
    error: action.error,
  });
};

// MAIN REDUCER

const AdminPanel = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_PAGE:
      return ChangeCurrentPage(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return FetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return FetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return FetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default AdminPanel;
