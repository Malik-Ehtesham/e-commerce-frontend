import React from "react";
import { connect } from "react-redux";

import StarRatingRead from "../StarRatingRead/StarRatingRead";

import * as actions from "../../Store/Actions/index";

const ReviewCard = (props) => {
  // ---------HANDLERS
  const DeleteReviewHandler = () => {
    props.onDeleteReview(props.id);
  };

  const UpdateReviewHandler = () => {
    props.toggleForm(true);
    props.onReviewToBeUpdated(props.completeReview);
  };

  // COMPONENT
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-start align-items-center">
        {/* <img
          className="rounded-circle border border-2"
          // src={props.user.photo}
          style={{ width: "60px" }}
          alt="Product"
        /> */}
        <p className=" fw-semibold m-1 ms-2">{props.user.username}</p>
      </div>
      <div className="card-body row">
        <div className="col-12 col-sm-8">
          <StarRatingRead rating={props.rating} />
          <h5 className="card-title fw-bold mt-2">{props.title}</h5>
          <p className="card-text mt-2">{props.review}</p>
        </div>
        {props.currentUser && props.currentUser._id === props.user._id && (
          <div className=" col-12 col-sm-4 d-flex justify-content-end align-items-end">
            <button
              className="btn btn-outline-info  mx-2"
              onClick={UpdateReviewHandler}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={DeleteReviewHandler}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteReview: (reviewId) => {
      dispatch(actions.deleteReview(reviewId));
    },
    onReviewToBeUpdated: (review) => {
      dispatch(actions.reviewToBeUpdated(review));
    },
  };
};

export default connect(null, mapDispatchToProps)(ReviewCard);
