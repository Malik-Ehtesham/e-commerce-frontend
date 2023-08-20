import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import ProductCard from "../ProductCard/ProductCard";
import Spinner from "../Spinner/Spinner";
import Reviews from "../Reviews/Reviews";

import * as actions from "../../Store/Actions/index";

import "./SingleProduct.css";
import StarRatingRead from "../StarRatingRead/StarRatingRead";

const SingleProduct = (props) => {
  // -----------VARIABLE DECALARATIONS-----------

  const { id, category } = useParams();

  let navigate = useNavigate();

  let disableDecrementButton;

  const token = localStorage.getItem("token");

  // ----------USE STATES------------

  const [loading, setLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [otherProducts, setOtherProducts] = useState([]);
  const [width, setWidth] = useState(0);
  const [showReview, setShowReview] = useState(false);

  // -------USE EFFECTS-------------
  useEffect(() => {
    setWidth(window.innerWidth);
  });
  useEffect(() => {
    props.onFetchSingleProduct(id);
    setProductQuantity(1);
    setShowReview(false);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://e-commerce-backend-production-e87.up.railway.app/api/products/category/${category}`
      )
      .then((res) => {
        return setOtherProducts(res.data), setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [category]);

  // ---------HANDLERS----------

  const toggleReviewHandler = () => {
    props.onFetchReviews(id);
    setShowReview(!showReview);
  };

  const QuantityIncrementHandler = () => {
    setProductQuantity(productQuantity + 1);
  };

  const QuantityDecrementHandler = () => {
    setProductQuantity(productQuantity - 1);
  };

  const AddToCartHandler = () => {
    const CartData = {
      product: id,
      quantity: productQuantity,
    };

    return props.onAddToCart(CartData, toast);
  };

  const BuyingSingleProductHandler = () => {
    props.onBuyingSingleProduct();
  };

  // ------COMPONENT------------

  // CHECK THESE FUNCTIONALITIES
  // -FORGET and RESET PASSWORD
  // -CHANGE ACCOUNT SETTINGS ICON
  // -MAKE IT FULLY RESPONSIVE
  // -PHOTO FUNCTIONALITY

  if (productQuantity === 1) {
    disableDecrementButton = true;
  } else {
    disableDecrementButton = false;
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <div className="container  ">
      <div className="row border border-info border-5 rounded-3 mx-1 py-3 my-5">
        <div className="col-md-3 col-12 d-flex  justify-content-center">
          <img
            src={props.SingleProduct.image}
            style={{ width: "300px", maxHeight: "300px" }}
            className="img-fluid "
          />
        </div>
        <div className="col-md-6 col-12">
          <div className="d-flex flex-column">
            <h1>{props.SingleProduct.title}</h1>

            <hr />
            <p className="fs-2 fw-semibold text-danger">
              Rs. {Math.round(props.SingleProduct.price)}
            </p>
            <strong className="">
              {!props.SingleProduct.rating ? (
                <StarRatingRead rating={0} />
              ) : (
                <StarRatingRead
                  rating={Math.round(props.SingleProduct.rating)}
                />
              )}
            </strong>
            <hr />
            <div className="d-flex">
              <p className="fs-5 fw-bold">Qunatity:&nbsp;</p>
              <div className="d-flex">
                <p
                  className="border border-secondary border-1 px-2  py-0 fs-5 fw-bold"
                  onClick={QuantityDecrementHandler}
                  style={
                    disableDecrementButton
                      ? { cursor: "pointer", pointerEvents: "none" }
                      : { cursor: "pointer" }
                  }
                >
                  -
                </p>
                <p className="border border-1 border-dark px-3  py-0 fs-5 ">
                  {productQuantity}
                </p>
                <p
                  className="border border-secondary border-1 px-2 py-0 fs-5 fw-bold"
                  onClick={QuantityIncrementHandler}
                  style={{ cursor: "pointer" }}
                >
                  +
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-evenly my-2">
              {token ? (
                <Link
                  to={`/Checkout/${id}/${Math.round(
                    props.SingleProduct.price
                  )}/${productQuantity}`}
                  className="btn btn-success btn-lg"
                  onClick={BuyingSingleProductHandler}
                >
                  Buy Now
                </Link>
              ) : (
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => navigate("/authenticate/Login")}
                >
                  Buy Now
                </button>
              )}

              {token ? (
                <button
                  className="btn btn-warning btn-lg"
                  onClick={AddToCartHandler}
                >
                  Add To Cart
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-lg"
                  onClick={() => navigate("/authenticate/Login")}
                >
                  Add To Cart
                </button>
              )}
            </div>
            <hr />
          </div>
        </div>
        <div className="col-md-3 col-12">
          <div className="d-flex flex-column">
            <p className="fs-4 fw-semibold mb-0">Standard Delivery</p>
            <p className="fs-5 lead">3-5 Days</p>
          </div>
          <hr className="mb-1" />
          <div className="d-flex flex-column">
            <p className="fs-5 fw-semibold mt-1 mb-1">7 Days Return</p>
            <p className="fs-5 fw-semibold mb-1 mt-1">Warranty Not Available</p>
          </div>
          <hr />
          <div className="d-flex flex-column">
            <p className="fs-4 fw-semibold mb-0">Delivery Method:</p>
            <p className="fs-5 lead">Cash On Delivery</p>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <button className="col-12 button-reviews" onClick={toggleReviewHandler}>
          Show Reviews
        </button>
      </div>
      {showReview && <Reviews />}

      <div className="row d-flex">
        <h3 className="text-start text-danger my-3  fw-semibold lead my-3">
          Related Products
        </h3>
        {loading ? (
          <Spinner />
        ) : (
          otherProducts.map((Products) => {
            return (
              <div
                className="col-md-3 col-6 d-flex  justify-content-center"
                key={Products.id}
              >
                {width <= 576 ? (
                  <ProductCard
                    id={Products.id}
                    width={width}
                    title={Products.title.substring(0, 40)}
                    description={Products.description.substring(0, 70)}
                    image={Products.image}
                    price={Products.price}
                    category={Products.category}
                  />
                ) : (
                  <ProductCard
                    id={Products.id}
                    width={width}
                    title={Products.title.substring(0, 50)}
                    description={Products.description.substring(0, 110)}
                    image={Products.image}
                    price={Products.price}
                    category={Products.category}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    Cart: state.Cart.Cart,
    Reviews: state.Reviews.Reviews,
    allProducts: state.Home.allProducts,
    SingleProduct: state.SingleProduct.SingleProduct,
    loading: state.SingleProduct.loading,
    token: state.Auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBuyingSingleProduct: () => {
      dispatch(actions.BuyingSingleProduct());
    },
    onAddToCart: (CartData, toast) => {
      dispatch(actions.AddToCart(CartData, toast));
    },
    onFetchSingleProduct: (id) => {
      dispatch(actions.FetchSingleProduct(id));
    },
    onFetchReviews: (productId) => {
      dispatch(actions.fetchReviews(productId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
