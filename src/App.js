import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./Containers/Home/Home";
import Auth from "./Containers/Auth/Auth";
import Cart from "./Containers/Cart/Cart";
import Orders from "./Containers/Orders/Orders";
import SingleProductPage from "./Containers/SingleProductPage/SingleProductPage";
import Checkout from "./Containers/Checkout/Checkout";
import OrderCompletePage from "./Containers/OrderCompletePage/OrderCompletePage";
import AdminPanel from "./Containers/AdminPanel/AdminPanel";
import SearchedProductsPage from "./Containers/SearchedProductsPage/SearchedProductsPage";
import SignupForm from "./Components/SignupForm/SignupForm";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

import "./App.css";
// Component
function App(props) {
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        {props.BuyingSingleProduct ? (
          <Route
            path="/Checkout/:id/:price/:productQuantity"
            element={<Checkout />}
          />
        ) : (
          <Route path="/Checkout/:price/" element={<Checkout />} />
        )}
        <Route path="/Product/:id/:category" element={<SingleProductPage />} />
        <Route path="/OrderComplete" element={<OrderCompletePage />} />

        {token ? (
          <>
            <Route path="/AdminPanel/Profile" element={<AdminPanel />} />
            <Route path="/AdminPanel/MyOrders" element={<AdminPanel />} />
            <Route
              path="/AdminPanel/AccountSettings"
              element={<AdminPanel />}
            />
          </>
        ) : null}

        <Route path="/authenticate/Signup" element={<SignupForm />} />
        <Route path="/authenticate/Login" element={<Auth />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="https://e-commerce-backend-production-e87.up.railway.app/api/users/resetPassword/:resetToken"
          element={<ResetPassword />}
        />

        <Route path="/MyOrders" element={<Orders />} />

        {props.SearchedProducts.length !== 0 ? (
          <Route path="/SearchedProducts" element={<SearchedProductsPage />} />
        ) : null}
      </Routes>{" "}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    token: state.Auth.token,
    BuyingSingleProduct: state.SingleProduct.BuyingSingleProduct,
    SearchedProducts: state.SearchedProducts.SearchedProducts,
  };
};

export default connect(mapStateToProps)(App);
