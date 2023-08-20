import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

import CheckoutFormProductCard from "../CheckoutFormProductCard/CheckoutFormProductCard";

import * as actions from "../../Store/Actions/index";

const CheckoutForm = (props) => {
  // VARIABLE DECALARTIONS

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { id, price, productQuantity } = useParams();

  // USE STATE

  const [checkoutProductData, setCheckoutProductData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [area, setArea] = useState("");

  // USE EFFECT

  useEffect(() => {
    axios
      .get(
        `https://e-commerce-backend-production-e87.up.railway.app/api/products/${id}`
      )
      .then((res) => {
        setCheckoutProductData(res.data);
      });
  }, [id]);

  useEffect(() => {
    if (props.success) {
      toast.success("Order Placed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/OrderComplete");
      props.onResetSuccessForCheckout();
    }
  }, [props.success]);
  // HANDLERS

  const CancelCheckoutHandler = () => {
    return navigate("/");
  };

  const PlaceOrderHandler = () => {
    const ProductInformation = props.BuyingSingleProduct
      ? [
          {
            product: checkoutProductData.id,
            quantity: productQuantity,
          },
        ]
      : props.Cart;

    const OrdersInformation = {
      shippingAddress,
      products: ProductInformation,
      totalPrice: props.BuyingSingleProduct ? price * productQuantity : price,
    };
    props.onPlaceOrder(OrdersInformation, props.onClearCart);
  };

  const checkValidity = (property, value, minLength, maxLength) => {
    switch (property?.type) {
      case "required":
        return (
          <p className="fs-6 m-0 text-danger fw-semibold">
            {`${value} is required.`}
          </p>
        );

      case "minLength":
        return (
          <p className="fs-6 m-0 text-danger fw-semibold">
            {`${value} should be ${minLength} characters long.`}
          </p>
        );

      case "maxLength":
        return (
          <p className="fs-6 m-0 text-danger fw-semibold">
            {`${value} should'nt be longer than ${maxLength} characters.`}
          </p>
        );

      case "pattern":
        return (
          <p className="fs-6 m-0 text-danger fw-semibold">
            {`${value} is not correct.`}
          </p>
        );

      default:
        <></>;
        break;
    }
  };
  // COMPONENT
  return (
    <div className="container">
      <div className="row my-2">
        <div className="col-12 col-md-8 border border-secondary border-5">
          <div className="d-flex flex-column justify-content-center ">
            <h4 className="text-center text-secondary my-2">
              Delievery Information
            </h4>
            <form>
              <div className="row my-4">
                <div className="col">
                  <input
                    {...register("firstName", {
                      required: true,
                      minLength: 3,
                      maxLength: 10,
                    })}
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    aria-label="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {checkValidity(errors.firstName, "First Name", "3", "10")}
                </div>
                <div className="col">
                  <input
                    {...register("lastName", {
                      required: true,
                      minLength: 3,
                      maxLength: 10,
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    aria-label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {checkValidity(errors.lastName, "Last Name", "3", "10")}
                </div>
              </div>
              <div className="row my-4">
                <div className="col">
                  <input
                    {...register("phoneNumber", {
                      required: true,
                      minLength: 11,
                      maxLength: 11,
                    })}
                    type="number"
                    className="form-control"
                    placeholder="Phone Number"
                    aria-label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />{" "}
                  {checkValidity(
                    errors.phoneNumber,
                    "Phone Number",
                    "11",
                    "11"
                  )}
                </div>
                <div className="col">
                  <input
                    {...register("email", {
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    type="email"
                    className="form-control"
                    placeholder="Email Address(Optional)"
                    aria-label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {checkValidity(errors.email, "Email")}
                </div>
              </div>
              <div className="row my-4">
                <div className="col">
                  <input
                    {...register("province", {
                      required: true,
                      minLength: 3,
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Province"
                    aria-label="Province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                  {checkValidity(errors.province, "Province", "3")}
                </div>
                <div className="col">
                  <input
                    {...register("city", {
                      required: true,
                      minLength: 3,
                    })}
                    type="text"
                    className="form-control"
                    placeholder="City"
                    aria-label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {checkValidity(errors.city, "City", "3")}
                </div>
              </div>
              <div className="row my-4">
                <div className="col">
                  <input
                    {...register("shippingAddress", {
                      required: true,
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    aria-label="Address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                  {checkValidity(errors.shippingAddress, "ShippingAddress")}
                </div>
                <div className="col">
                  <input
                    {...register("area")}
                    type="text"
                    className="form-control"
                    placeholder="Area(Optional)"
                    aria-label="Area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  {checkValidity(errors.area, "Area")}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-4  border border-secondary border-5">
          <div className="d-flex flex-column justify-content-center px-1 py-2">
            <h1 className="fs-4 ">Payment Method</h1>
            <hr className="mt-0" />
            <div className="form-check">
              <input
                className="form-check-input mt-2 rounded-5 bg-dark"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label
                className="form-check-label fs-5"
                htmlFor="flexCheckChecked"
              >
                Cash On Delievery
              </label>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center px-1 py-2">
            <h1 className="fs-4 ">Total Payment</h1>
            <hr className="mt-0" />
            <div className="form-check">
              <input
                className="form-check-input mt-2 rounded-5 bg-dark"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label
                className="form-check-label fs-5 fw-semibold text-danger"
                htmlFor="flexCheckChecked"
              >
                {props.BuyingSingleProduct
                  ? `Rs. ${Math.round(price * productQuantity)}`
                  : `Rs. ${Math.round(price)}`}
              </label>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-column justify-content-center px-1 py-2">
            <div className="d-flex justify-content-center mt-2">
              <button
                className="btn btn-danger btn-lg mx-4"
                onClick={CancelCheckoutHandler}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-lg mx-4"
                onClick={handleSubmit(PlaceOrderHandler)}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-12">
          <h2 className="text-center text-info">Your Products</h2>
        </div>
      </div>
      {props.BuyingSingleProduct ? (
        <CheckoutFormProductCard
          image={checkoutProductData.image}
          description={checkoutProductData.description}
          title={checkoutProductData.title}
          id={checkoutProductData.id}
          price={checkoutProductData.price}
          quantity={productQuantity}
        />
      ) : (
        props.Cart.map((CartItem) => {
          return (
            <CheckoutFormProductCard
              key={CartItem._id}
              id={CartItem._id}
              image={CartItem.product.image}
              description={CartItem.product.description.substring(0, 250)}
              title={CartItem.product.title}
              price={CartItem.product.price}
              quantity={CartItem.quantity}
            />
          );
        })
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    BuyingSingleProduct: state.SingleProduct.BuyingSingleProduct,
    Cart: state.Cart.Cart,
    error: state.Checkout.error,
    success: state.Checkout.success,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPlaceOrder: (OrdersInformation, clearCart) => {
      dispatch(actions.PlaceOrder(OrdersInformation, clearCart));
    },

    onResetSuccessForCheckout: () => {
      dispatch(actions.ResetSuccessForCheckout());
    },
    onClearCart: () => {
      dispatch(actions.clearCart());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
