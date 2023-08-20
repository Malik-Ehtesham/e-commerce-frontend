import * as actionTypes from "../Actions/actionTypes";

import { UpdateObject } from "./utility";
// INITIAL STATE

const initialState = {
  user: null,
  loading: false,
  token: null,

  error: "",
  success: false,
};

// HELPER FUNCTIONS

const authStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    user: null,
    token: "",
  });
};

const authSuccess = (state, action) => {
  return UpdateObject(state, {
    user: action.user,
    token: action.token,
    loading: false,
    error: "",
  });
};

const authFail = (state, action) => {
  return UpdateObject(state, {
    user: null,
    token: "",
    loading: false,
    error: action.error,
  });
};

const updateUserDataStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    error: "",
    success: false,
  });
};

const updateUserDataSuccess = (state, action) => {
  return UpdateObject(state, {
    user: action.updatedUser,

    loading: false,
    error: "",
    success: true,
  });
};

const updateUserDataFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
    success: false,
  });
};

const UpdatingPasswordStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    error: "",
  });
};

const UpdatingPasswordSuccess = (state, action) => {
  return UpdateObject(state, {
    token: action.token,
    loading: false,
    error: "",
  });
};

const UpdatingPasswordFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
  });
};

const DeleteAccountStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    error: "",
  });
};

const DeleteAccountSuccess = (state, action) => {
  localStorage.removeItem("token");
  return UpdateObject(state, {
    loading: false,
    error: "",
  });
};

const DeleteAccountFail = (state, action) => {
  return UpdateObject(state, {
    error: action.error,
    loading: false,
  });
};

const Logout = (state, action) => {
  localStorage.removeItem("token");
  return UpdateObject(state, {
    token: null,
    user: null,
    error: "",
  });
};

const ForgotPasswordStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    error: "",
    success: false,
  });
};
const ForgotPasswordSuccess = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: "",
    success: true,
  });
};
const ForgotPasswordFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
    success: false,
  });
};

const ResetPasswordStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
    error: "",
    success: false,
  });
};
const ResetPasswordSuccess = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: "",
    success: true,
    token: action.token,
    user: action.user,
  });
};
const ResetPasswordFail = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    error: action.error,
    success: false,
  });
};

const ResetSuccessForAuth = (state, action) => {
  return UpdateObject(state, {
    success: false,
  });
};
// MAIN REDUCER
const Auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.UPDATE_USER_DATA_START:
      return updateUserDataStart(state, action);
    case actionTypes.UPDATE_USER_DATA_SUCCESS:
      return updateUserDataSuccess(state, action);
    case actionTypes.UPDATE_USER_DATA_FAIL:
      return updateUserDataFail(state, action);
    case actionTypes.DELETE_ACCOUNT_START:
      return DeleteAccountStart(state, action);
    case actionTypes.DELETE_ACCOUNT_SUCCESS:
      return DeleteAccountSuccess(state, action);
    case actionTypes.DELETE_ACCOUNT_FAIL:
      return DeleteAccountFail(state, action);
    case actionTypes.LOGOUT:
      return Logout(state, action);
    case actionTypes.UPDATING_PASSWORD_START:
      return UpdatingPasswordStart(state, action);
    case actionTypes.UPDATING_PASSWORD_SUCCESS:
      return UpdatingPasswordSuccess(state, action);
    case actionTypes.UPDATING_PASSWORD_FAIL:
      return UpdatingPasswordFail(state, action);
    case actionTypes.FORGOT_PASSWORD_START:
      return ForgotPasswordStart(state, action);
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return ForgotPasswordSuccess(state, action);
    case actionTypes.FORGOT_PASSWORD_FAIL:
      return ForgotPasswordFail(state, action);
    case actionTypes.RESET_PASSWORD_START:
      return ResetPasswordStart(state, action);
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return ResetPasswordSuccess(state, action);
    case actionTypes.RESET_PASSWORD_FAIL:
      return ResetPasswordFail(state, action);
    case actionTypes.RESET_SUCCESS:
      return ResetSuccessForAuth(state, action);
    default:
      return state;
  }
};
export default Auth;
