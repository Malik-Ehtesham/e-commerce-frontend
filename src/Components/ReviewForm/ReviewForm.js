import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

import StarRatingCreate from "../StarRatingCreate/StarRatingCreate";

import * as actions from "../../Store/Actions/index";

const ReviewForm = (props) => {
  // ---------USE STATES------------

  const [reviewTitle, setReviewTitle] = useState(
    props.review ? props.review.title : ""
  );

  const [review, setReview] = useState(
    props.review ? props.review.comment : ""
  );

  const [rating, setRating] = useState(props.review ? props.review.rating : "");

  // -----------USE EFFECTS----------

  useEffect(() => {
    if (props.success) {
      props.toggleForm();
      props.onResetSuccessForReview();
    }
  }, [props.success]);

  // ----------VARIABLE DECALARATIONS-------------

  const { id } = useParams();

  const strArray = props.error.split(". ");

  // -------------HANDLERS--------------

  const CreateReviewHandler = (event) => {
    event.preventDefault();

    const updatedOrCreateReview = {
      id: props.review ? props.review.id : null,
      title: reviewTitle,
      rating,
      comment: review,
    };

    if (props.review) {
      props.onUpdateReview(props.review._id, updatedOrCreateReview);
    } else {
      props.onCreateReview(updatedOrCreateReview, id);
    }
  };

  const RatingHandler = (ratingFromChild) => {
    setRating(ratingFromChild);
  };

  return (
    <div className="col-12 d-flex flex-column ">
      <p className="fw-bold">Write a review</p>
      <form onSubmit={CreateReviewHandler}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Review Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Review Title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
          {props.error ? (
            <p className="fs-6 m-0 text-danger fw-semibold">
              {strArray.filter((error) => error.includes("title"))}
            </p>
          ) : null}
        </div>
        <StarRatingCreate sendRatingToParent={RatingHandler} />
        {props.error ? (
          <p className="fs-6 m-0 text-danger fw-semibold">
            {strArray.filter((error) => error.includes("rating"))}
          </p>
        ) : null}
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Review
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          {props.error ? (
            <p className="fs-6 m-0 text-danger fw-semibold">
              {strArray.filter((error) => error.includes("comment"))}
            </p>
          ) : null}
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">
            {props.review ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.Reviews.error,
    success: state.Reviews.success,
    reviews: state.Reviews.Reviews,
    review: state.Reviews.Review,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateReview: (data, id) => {
      dispatch(actions.createReview(data, id));
    },
    onResetSuccessForReview: () => {
      dispatch(actions.ResetSuccessForReview());
    },
    onUpdateReview: (reviewId, updatedData) => {
      dispatch(actions.updateReview(reviewId, updatedData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
