import React from "react";
import { createRoot } from "react-dom/client";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import App from "./App";
import HomeReducer from "./Store/Reducers/Home";
import CartReducer from "./Store/Reducers/Cart";
import SingleProductReducer from "./Store/Reducers/SingleProduct";
import CheckoutReducer from "./Store/Reducers/Checkout";
import AuthReducer from "./Store/Reducers/Auth";
import AdminPanelReducer from "./Store/Reducers/AdminPanel";
import SearchedProductsReducer from "./Store/Reducers/SearchedProducts";
import ReviewReducer from "./Store/Reducers/Review";

// ------COMBINING REDUCERS--------
const RootReducer = combineReducers({
  Home: HomeReducer,
  Cart: CartReducer,
  SingleProduct: SingleProductReducer,
  Auth: AuthReducer,
  AdminPanel: AdminPanelReducer,
  Checkout: CheckoutReducer,
  SearchedProducts: SearchedProductsReducer,
  Reviews: ReviewReducer,
});

// ------ADDING REDUX DEVTOOLS-------

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// -------CREATING STORE----------

const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const root = createRoot(document.getElementById("root"));

// ROOT RENDER
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
