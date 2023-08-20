import * as actionTypes from "../Actions/actionTypes";

import { UpdateObject } from "../Reducers/utility";

// ----INITIAL STATE--------

const initialState = {
  SingleProduct: {},
  loading: false,
  BuyingSingleProduct: false,
};

// -------HELPER FUNCTIONS---------

const FetchSingleProductStart = (state, action) => {
  return UpdateObject(state, {
    SingleProduct: {},
    loading: true,
    BuyingSingleProduct: false,
  });
};

const FetchSingleProductSuccess = (state, action) => {
  return UpdateObject(state, {
    SingleProduct: action.SingleProduct,
    loading: false,
    BuyingSingleProduct: false,
  });
};

const FetchSingleProductFail = (state, action) => {
  return UpdateObject(state, {
    SingleProduct: {},
    loading: false,
    BuyingSingleProduct: false,
  });
};

const BuyingSingleProduct = (state, action) => {
  return UpdateObject(state, {
    BuyingSingleProduct: true,
  });
};

const BuyingAllCartProducts = (state, action) => {
  return UpdateObject(state, {
    BuyingSingleProduct: false,
  });
};

//-----MAIN REDUCER-------

const SingleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SINGLE_PRODUCT_START:
      return FetchSingleProductStart(state, action);
    case actionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
      return FetchSingleProductSuccess(state, action);
    case actionTypes.FETCH_SINGLE_PRODUCT_FAIL:
      return FetchSingleProductFail(state, action);
    case actionTypes.BUYING_SINGLE_PRODUCT:
      return BuyingSingleProduct(state, action);
    case actionTypes.BUYING_ALL_CART_PRODUCTS:
      return BuyingAllCartProducts(state, action);
    default:
      return state;
  }
};

export default SingleProductReducer;
