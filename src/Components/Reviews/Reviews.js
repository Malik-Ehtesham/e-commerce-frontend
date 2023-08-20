import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewCard from "../ReviewCard/ReviewCard";
import Spinner from "../Spinner/Spinner";

import * as actions from "../../Store/Actions/index";

const Reviews = (props) => {
  // ---------USE STATES-----------

  const [writeReview, setWriteReview] = useState(false);

  // ---------USE EFFECTS-------------

  useEffect(() => {
    if (props.success) {
      props.onFetchReviews(id);
    }
  }, [props.success]);

  // -----------VARIABLE DECALARATIONS----------

  const { id } = useParams();

  const token = localStorage.getItem("token");

  // ------HANDLERS--------

  const toggleWriteReviewHandler = () => {
    setWriteReview(!writeReview);
    props.onResetSuccessForReview();
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <div className="border mt-3">
      <div className="row p-2">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <p className="fs-3 fw-semibold mb-1">Customer Reviews</p>

          {writeReview ? (
            <button
              className="btn btn-danger"
              onClick={toggleWriteReviewHandler}
            >
              Cancel
            </button>
          ) : token ? (
            <button
              className="btn btn-primary"
              onClick={toggleWriteReviewHandler}
            >
              Write a review
            </button>
          ) : (
            <Link
              to="/authenticate/login"
              className="btn btn-primary"
              onClick={toggleWriteReviewHandler}
            >
              Write a review
            </Link>
          )}
        </div>
        {writeReview && <ReviewForm toggleForm={toggleWriteReviewHandler} />}
      </div>
      {props.Reviews.length !== 0 ? (
        <div className="row ">
          <div className="col-12">
            {props.Reviews.map((review) => {
              return (
                <ReviewCard
                  key={review._id}
                  id={review._id}
                  completeReview={review}
                  title={review.title}
                  rating={review.rating}
                  review={review.comment}
                  user={review.user}
                  currentUser={props.user}
                  toggleForm={toggleWriteReviewHandler}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <p className="fs-5 text-center text-primary fw-bold border-top border-5 py-2">
          Be the first to write a review!
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.Auth.token,
    user: state.Auth.user,
    error: state.Auth.error,
    Reviews: state.Reviews.Reviews,
    success: state.Reviews.success,
    loading: state.Reviews.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReviews: (productId) => {
      dispatch(actions.fetchReviews(productId));
    },
    onResetSuccessForReview: () => {
      dispatch(actions.ResetSuccessForReview());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
