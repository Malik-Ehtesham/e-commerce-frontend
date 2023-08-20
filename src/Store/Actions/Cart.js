import axios from "axios";

import * as actionTypes from "./actionTypes";

// ----------CREATING CART------------

export const createCartStart = () => ({
  type: actionTypes.CREATE_CART_START,
});

export const createCartSuccess = (cart) => ({
  type: actionTypes.CREATE_CART_SUCCESS,
  cart,
});

export const createCartFail = (error) => ({
  type: actionTypes.CREATE_CART_FAIL,
  error,
});

export const createCart = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch(createCartStart());
    const response = await axios.post(
      "https://e-commerce-backend-production-e87.up.railway.app/api/carts/create-cart",
      null,
      config
    );

    dispatch(createCartSuccess(response.data.cart));
  } catch (error) {
    dispatch(createCartFail(error.response.data.message));
  }
};

// -----FETCHING CART DATA----------

export const FetchCartSuccess = (result) => {
  return { type: actionTypes.FETCH_CART_SUCCESS, Cart: result };
};

export const FetchCartStart = () => {
  return { type: actionTypes.FETCH_CART_START };
};

export const FetchCartFail = (error) => {
  return { type: actionTypes.FETCH_CART_FAIL, error: error };
};

export const FetchCart = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    dispatch(FetchCartStart());
    axios
      .get(
        "https://e-commerce-backend-production-e87.up.railway.app/api/carts/my-cart",
        config
      )
      .then((res) => {
        dispatch(FetchCartSuccess(res.data.cart.items));
      })
      .catch((err) => dispatch(FetchCartFail(err.response.data.message)));
  };
};

// ----ADD ITEM TO CART--------------

export const AddToCartStart = () => {
  return { type: actionTypes.ADD_TO_CART_START };
};

export const AddToCartSuccess = (toastSuccess) => {
  toastSuccess("Added To Cart!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  return { type: actionTypes.ADD_TO_CART_SUCCESS };
};

export const AddToCartFail = (error, toastError) => {
  toastError(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  return { type: actionTypes.ADD_TO_CART_FAIL, error };
};

export const AddToCart = (CartData, toast) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    dispatch(AddToCartStart());
    axios
      .post(
        "https://e-commerce-backend-production-e87.up.railway.app/api/carts/add-to-cart",
        CartData,
        config
      )
      .then((res) => dispatch(AddToCartSuccess(toast.success)))
      .catch((err) => {
        dispatch(AddToCartFail(err.response.data.message, toast.error));
      });
  };
};

// ----REMOVE ITEM FROM CART------------
export const removeItemStart = () => ({
  type: actionTypes.REMOVE_ITEM_START,
});

export const removeItemSuccess = (cart, toast) => (
  toast.success("Cart Item Removed!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }),
  {
    type: actionTypes.REMOVE_ITEM_SUCCESS,
    cart,
  }
);

export const removeItemFail = (error) => ({
  type: actionTypes.REMOVE_ITEM_FAIL,
  error,
});

export const removeCartItem = (itemId, toast) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  dispatch(removeItemStart());
  try {
    const response = await axios.delete(
      `https://e-commerce-backend-production-e87.up.railway.app/api/carts/delete-cart-item/${itemId}`,
      config
    );

    dispatch(removeItemSuccess(response.data.cart.items, toast));
  } catch (error) {
    dispatch(removeItemFail(error.response.data.message));
  }
};

// ------UPDATE QUANTITY----------
export const updateQuantityStart = () => ({
  type: actionTypes.UPDATE_QUANTITY_START,
});

export const updateQuantitySuccess = (cart) => ({
  type: actionTypes.UPDATE_QUANTITY_SUCCESS,
  cart,
});

export const updateQuantityFail = (error) => ({
  type: actionTypes.UPDATE_QUANTITY_FAIL,
  error,
});

export const updateCartItemQuantity =
  (itemId, quantity) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    dispatch(updateQuantityStart());
    try {
      const response = await axios.patch(
        `https://e-commerce-backend-production-e87.up.railway.app/api/carts/update-cart-item/${itemId}`,
        { quantity },
        config
      );

      dispatch(updateQuantitySuccess(response.data.cart.items));
    } catch (error) {
      dispatch(updateQuantityFail(error.response.data.message));
    }
  };

// ----------CLEAR ALL CART---------
export const clearCartStart = () => ({
  type: actionTypes.CLEAR_CART_START,
});

export const clearCartSuccess = (toast) => (
  toast.success("Cart Cleared!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }),
  {
    type: actionTypes.CLEAR_CART_SUCCESS,
  }
);

export const clearCartFail = (error) => ({
  type: actionTypes.CLEAR_CART_FAIL,
  payload: error,
});

export const clearCart = (toast) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(clearCartStart());
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  try {
    await axios.delete(
      "https://e-commerce-backend-production-e87.up.railway.app/api/carts/clear-cart/",
      config
    );

    dispatch(clearCartSuccess(toast));
  } catch (error) {
    dispatch(clearCartFail(error.response.data.message));
  }
};
