import * as actionTypes from "../Actions/actionTypes";

import { UpdateObject } from "../Reducers/utility";

// ----INITIAL STATE--------

const initialState = {
  Cart: [],
  loading: false,
  error: "",
};

// ----HELPER FUNCTIONS--------

const CreateCartStart = (state, action) => {
  return UpdateObject(state, { loading: true, error: "" });
};

const CreateCartSuccess = (state, action) => {
  return UpdateObject(state, {
    Cart: action.cart,
    loading: false,
    error: "",
  });
};

const CreateCartFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
  });
};

const FetchCartStart = (state, action) => {
  return UpdateObject(state, { loading: true, error: "" });
};

const FetchCartSuccess = (state, action) => {
  return UpdateObject(state, {
    Cart: action.Cart,
    loading: false,
    error: "",
  });
};

const FetchCartFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
  });
};

const AddToCartStart = (state, action) => {
  return UpdateObject(state, { loading: true, error: "" });
};

const AddToCartSuccess = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: "",
  });
};

const AddToCartFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
  });
};

const RemoveItemStart = (state, action) => {
  return UpdateObject(state, { loading: true, error: "" });
};

const RemoveItemSuccess = (state, action) => {
  return UpdateObject(state, {
    Cart: action.cart,
    loading: false,
    error: "",
  });
};

const RemoveItemFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
  });
};

const UpdateQuantityStart = (state, action) => {
  return UpdateObject(state, { loading: true, error: "" });
};

const UpdateQuantitySuccess = (state, action) => {
  return UpdateObject(state, {
    Cart: action.cart,
    loading: false,
    error: "",
  });
};

const UpdateQuantityFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
  });
};

const ClearCartStart = (state, action) => {
  return UpdateObject(state, { loading: true, error: "" });
};

const ClearCartSuccess = (state, action) => {
  return UpdateObject(state, {
    Cart: [],
    loading: false,
    error: "",
  });
};

const ClearCartFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
  });
};

// ----------MAIN REDUCER-------------
const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CART_START:
      return CreateCartStart(state, action);
    case actionTypes.CREATE_CART_SUCCESS:
      return CreateCartSuccess(state, action);
    case actionTypes.CREATE_CART_FAIL:
      return CreateCartFail(state, action);
    case actionTypes.ADD_TO_CART_START:
      return AddToCartStart(state, action);
    case actionTypes.ADD_TO_CART_SUCCESS:
      return AddToCartSuccess(state, action);
    case actionTypes.ADD_TO_CART_FAIL:
      return AddToCartFail(state, action);
    case actionTypes.FETCH_CART_START:
      return FetchCartStart(state, action);
    case actionTypes.FETCH_CART_SUCCESS:
      return FetchCartSuccess(state, action);
    case actionTypes.FETCH_CART_FAIL:
      return FetchCartFail(state, action);
    case actionTypes.REMOVE_ITEM_START:
      return RemoveItemStart(state, action);
    case actionTypes.REMOVE_ITEM_SUCCESS:
      return RemoveItemSuccess(state, action);
    case actionTypes.REMOVE_ITEM_FAIL:
      return RemoveItemFail(state, action);
    case actionTypes.UPDATE_QUANTITY_START:
      return UpdateQuantityStart(state, action);
    case actionTypes.UPDATE_QUANTITY_SUCCESS:
      return UpdateQuantitySuccess(state, action);
    case actionTypes.UPDATE_QUANTITY_FAIL:
      return UpdateQuantityFail(state, action);
    case actionTypes.CLEAR_CART_START:
      return ClearCartStart(state, action);
    case actionTypes.CLEAR_CART_SUCCESS:
      return ClearCartSuccess(state, action);
    case actionTypes.CLEAR_CART_FAIL:
      return ClearCartFail(state, action);

    default:
      return state;
  }
};
export default CartReducer;
