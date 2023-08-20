import * as actionType from "../Actions/actionTypes";

import { UpdateObject } from "./utility";

// INITIAL STATE

const initialState = {
  allProducts: [],

  loading: false,
};

// HELPER FUNCTIONS
const FetchAllProductsStart = (state, action) => {
  return UpdateObject(state, { allProducts: [], loading: true });
};
const FetchAllProductsSuccess = (state, action) => {
  return UpdateObject(state, {
    allProducts: action.allProducts,
    loading: false,
  });
};
const FetchAllProductsFail = (state, action) => {
  return UpdateObject(state, { allProducts: [], loading: false });
};
// REDUCER
const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_ALL_PRODUCTS_START:
      return FetchAllProductsStart(state, action);
    case actionType.FETCH_ALL_PRODUCTS_SUCCESS:
      return FetchAllProductsSuccess(state, action);
    case actionType.FETCH_ALL_PRODUCTS_FAIL:
      return FetchAllProductsFail(state, action);
    default:
      return state;
  }
};

export default HomeReducer;
