import axios from "axios";

import * as actionTypes from "./actionTypes";

// -----------FETCH REVIEWS FOR A PRODUCT------------

export const fetchReviewsStart = () => ({
  type: actionTypes.FETCH_REVIEWS_START,
});

export const fetchReviewsSuccess = (reviews) => ({
  type: actionTypes.FETCH_REVIEWS_SUCCESS,
  reviews,
});

export const fetchReviewsFail = (error) => ({
  type: actionTypes.FETCH_REVIEWS_FAIL,
  error,
});

export const fetchReviews = (productId) => async (dispatch) => {
  dispatch(fetchReviewsStart());
  try {
    const response = await axios.get(
      `https://e-commerce-backend-production-e87.up.railway.app/api/products/${productId}/reviews`
    );
    dispatch(fetchReviewsSuccess(response.data));
  } catch (error) {
    dispatch(fetchReviewsFail(error.response.data.message));
  }
};

// ----------CREATE REVIEW-------------

export const createReviewStart = () => ({
  type: actionTypes.CREATE_REVIEW_START,
});

export const createReviewSuccess = (review) => ({
  type: actionTypes.CREATE_REVIEW_SUCCESS,
  review,
});

export const createReviewFail = (error) => ({
  type: actionTypes.CREATE_REVIEW_FAIL,
  error,
});

export const createReview = (reviewData, productId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(createReviewStart());
  try {
    const response = await axios.post(
      `https://e-commerce-backend-production-e87.up.railway.app/api/products/${productId}/reviews`,
      reviewData,
      config
    );
    dispatch(createReviewSuccess(response.data));
  } catch (error) {
    dispatch(createReviewFail(error.response.data.message));
  }
};

// --------RESET SUCCESS--------
export const ResetSuccessForReview = () => {
  return { type: actionTypes.RESET_SUCCESS };
};

// ----------DELETE REVIEW-----------

export const deleteReviewStart = () => ({
  type: actionTypes.DELETE_REVIEW_START,
});

export const deleteReviewSuccess = (reviewId) => ({
  type: actionTypes.DELETE_REVIEW_SUCCESS,
  reviewId,
});

export const deleteReviewFail = (error) => ({
  type: actionTypes.DELETE_REVIEW_FAIL,
  error,
});

export const deleteReview = (reviewId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return async (dispatch) => {
    try {
      dispatch(deleteReviewStart());

      await axios.delete(
        `https://e-commerce-backend-production-e87.up.railway.app/api/reviews/${reviewId}`,
        config
      );

      dispatch(deleteReviewSuccess(reviewId));
    } catch (error) {
      dispatch(deleteReviewFail(error.response.data.message));
    }
  };
};

// ---------------UPDATE REVIEW-----------
export const updateReviewStart = () => ({
  type: actionTypes.UPDATE_REVIEW_START,
});

export const updateReviewSuccess = (updatedReview) => ({
  type: actionTypes.UPDATE_REVIEW_SUCCESS,
  // updatedReview,
});

export const updateReviewFail = (error) => ({
  type: actionTypes.UPDATE_REVIEW_FAIL,
  error,
});

export const updateReview = (reviewId, updatedData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return async (dispatch) => {
    try {
      dispatch(updateReviewStart());

      const response = await axios.patch(
        `https://e-commerce-backend-production-e87.up.railway.app/api/reviews/${reviewId}`,
        updatedData,
        config
      );

      dispatch(updateReviewSuccess());
    } catch (error) {
      dispatch(updateReviewFail(error.response.data.message));
    }
  };
};

export const reviewToBeUpdated = (review) => ({
  type: actionTypes.REVIEW_TO_BE_UPDATED,
  review,
});

export const updateReviews = (updatedReviews) => {
  return {
    type: actionTypes.UPDATE_REVIEWS,
    updatedReviews,
  };
};
