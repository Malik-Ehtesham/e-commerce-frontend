import * as actionTypes from "../Actions/actionTypes";
import { UpdateObject } from "./utility";

const initialState = {
  Reviews: [],
  Review: null,
  loading: false,
  error: "",
  success: false,
};

// HELPER FUNCTIONS

const FetchAllReviewsStart = (state, action) => {
  return UpdateObject(state, {
    Reviews: [],
    loading: true,
    error: "",
  });
};
const FetchAllReviewsSuccess = (state, action) => {
  return UpdateObject(state, {
    Reviews: action.reviews,
    loading: false,
    error: "",
  });
};
const FetchAllReviewsFail = (state, action) => {
  return UpdateObject(state, {
    Reviews: [],
    loading: false,
    error: action.error,
  });
};

const CreateReviewStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    error: "",
    success: false,
  });
};

const CreateReviewSuccess = (state, action) => {
  return UpdateObject(state, {
    Reviews: [...state.Reviews, action.review],
    loading: false,
    error: "",
    success: true,
  });
};

const CreateReviewFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
    success: false,
  });
};

const DeleteReviewStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    error: "",
    success: false,
  });
};

const DeleteReviewSuccess = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: "",
    success: true,
  });
};

const DeleteReviewFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
    success: false,
  });
};

const UpdateReviewStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    error: "",
    success: false,
  });
};

const UpdateReviewSuccess = (state, action) => {
  return UpdateObject(state, {
    Review: null,
    loading: false,
    error: "",
    success: true,
  });
};

const UpdateReviewFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
    success: false,
  });
};

const ReviewToBeUpdated = (state, action) => {
  return UpdateObject(state, {
    Review: action.review,
  });
};

const ResetSuccessForReview = (state, action) => {
  return UpdateObject(state, {
    success: false,
    Review: null,
  });
};

const UpdateReviews = (state, action) => {
  return UpdateObject(state, {
    Reviews: action.updatedReviews,
  });
};
const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REVIEWS_START:
      return FetchAllReviewsStart(state, action);
    case actionTypes.FETCH_REVIEWS_SUCCESS:
      return FetchAllReviewsSuccess(state, action);
    case actionTypes.FETCH_REVIEWS_FAIL:
      return FetchAllReviewsFail(state, action);
    case actionTypes.CREATE_REVIEW_START:
      return CreateReviewStart(state, action);
    case actionTypes.CREATE_REVIEW_SUCCESS:
      return CreateReviewSuccess(state, action);
    case actionTypes.CREATE_REVIEW_FAIL:
      return CreateReviewFail(state, action);
    case actionTypes.DELETE_REVIEW_START:
      return DeleteReviewStart(state, action);
    case actionTypes.DELETE_REVIEW_SUCCESS:
      return DeleteReviewSuccess(state, action);
    case actionTypes.DELETE_REVIEW_FAIL:
      return DeleteReviewFail(state, action);
    case actionTypes.UPDATE_REVIEW_START:
      return UpdateReviewStart(state, action);
    case actionTypes.UPDATE_REVIEW_SUCCESS:
      return UpdateReviewSuccess(state, action);
    case actionTypes.UPDATE_REVIEW_FAIL:
      return UpdateReviewFail(state, action);
    case actionTypes.REVIEW_TO_BE_UPDATED:
      return ReviewToBeUpdated(state, action);
    case actionTypes.UPDATE_REVIEWS:
      return UpdateReviews(state, action);
    case actionTypes.RESET_SUCCESS:
      return ResetSuccessForReview(state, action);
    default:
      return state;
  }
};

export default ReviewReducer;
