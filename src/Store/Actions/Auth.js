import axios from "axios";
import * as actionTypes from "./actionTypes";

// --------LOGIN/SIGNUP WORK-----------

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (user, token) => ({
  type: actionTypes.AUTH_SUCCESS,
  user,
  token,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error,
});

export const auth = (data, isSignup) => async (dispatch) => {
  try {
    dispatch(authStart());
    const response = await axios.post(
      `https://e-commerce-backend-production-e87.up.railway.app/api/users/${
        isSignup ? "signup" : "login"
      }`,
      data
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.user);

    dispatch(authSuccess(response.data.user, response.data.token));
  } catch (error) {
    dispatch(authFail(error.response.data.message));
  }
};

// -------------LOGOUT-------------
export const logout = () => ({
  type: actionTypes.LOGOUT,
});

// ------------------------DELETING CURRENT USER----------------------

const DeleteAccountStart = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_START,
  };
};

const DeleteAccountSuccess = (toastSuccess) => {
  toastSuccess("Account Deleted Successfully!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  return {
    type: actionTypes.DELETE_ACCOUNT_SUCCESS,
  };
};

const DeleteAccountFail = (toastError, error) => {
  toastError(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  return {
    type: actionTypes.DELETE_ACCOUNT_FAIL,
    error: error,
  };
};

export const DeleteAccount = (Logout, navigate, toastSuccess, toastError) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    dispatch(DeleteAccountStart());
    axios
      .delete(
        "https://e-commerce-backend-production-e87.up.railway.app/api/users/deleteMe",
        config
      )
      .then((res) => {
        dispatch(DeleteAccountSuccess(toastSuccess));
        navigate("/");
        Logout();
      })
      .catch((err) => {
        dispatch(DeleteAccountFail(toastError, err.response.data.message));
      });
  };
};

// -------------------------UPDATING CURRENT USER----------------------

export const updateUserDataStart = () => {
  return {
    type: actionTypes.UPDATE_USER_DATA_START,
  };
};

export const updateUserDataSuccess = (updatedUser) => {
  return {
    type: actionTypes.UPDATE_USER_DATA_SUCCESS,
    updatedUser,
  };
};

export const updateUserDataFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_DATA_FAIL,
    error,
  };
};

export const updateUserData = (updatedProfilePageData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    dispatch(updateUserDataStart());
    axios
      .patch(
        "https://e-commerce-backend-production-e87.up.railway.app/api/users/updateMe",
        updatedProfilePageData,
        config
      )
      .then((res) => {
        dispatch(updateUserDataSuccess(res.data.data.user));
      })
      .catch((err) => {
        dispatch(updateUserDataFail(err.response.data.message));
      });
  };
};

// RESET SUCCESS

export const ResetSuccessForAuth = () => {
  return { type: actionTypes.RESET_SUCCESS };
};

// -------------------UPDATING PASSWORD----------------------

export const UpdatingPasswordStart = () => {
  return { type: actionTypes.UPDATING_PASSWORD_START };
};

export const UpdatingPasswordSuccess = (token, user, toastSuccess) => {
  toastSuccess("Password Updated Successfully!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  localStorage.setItem("token", token);
  return {
    type: actionTypes.UPDATING_PASSWORD_SUCCESS,
    token: token,
    user: user,
  };
};
export const UpdatingPasswordFail = (toastError, error) => {
  return { type: actionTypes.UPDATING_PASSWORD_FAIL, error };
};

export const PasswordUpdate = (
  dataForUpdatingPassword,
  toastSuccess,
  toastError
) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    dispatch(UpdatingPasswordStart());
    axios
      .patch(
        "https://e-commerce-backend-production-e87.up.railway.app/api/users/updateMyPassword",
        dataForUpdatingPassword,
        config
      )
      .then((res) => {
        dispatch(
          UpdatingPasswordSuccess(res.data.token, res.data.user, toastSuccess)
        );
      })
      .catch((error) =>
        dispatch(UpdatingPasswordFail(toastError, error.response.data.message))
      );
  };
};

// ---------------------FORGOT AND RESET PASSWORD------------------

export const ForgotPasswordStart = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_START,
  };
};
export const ForgotPasswordSuccess = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_SUCCESS,
  };
};
export const ForgotPasswordFail = (error) => {
  return {
    type: actionTypes.FORGOT_PASSWORD_FAIL,
    error,
  };
};

export const ForgotPassword = (email) => {
  return (dispatch) => {
    dispatch(ForgotPasswordStart());
    axios
      .post(
        "https://e-commerce-backend-production-e87.up.railway.app/api/users/forgotPassword",
        { email }
      )
      .then((res) => dispatch(ForgotPasswordSuccess()))
      .catch((error) =>
        dispatch(ForgotPasswordFail(error.response.data.message))
      );
  };
};

export const ResetPasswordStart = () => ({
  type: actionTypes.RESET_PASSWORD_START,
});

export const ResetPasswordSuccess = (token, user) => {
  localStorage.setItem("token", token);
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    token,
    user,
  };
};

export const ResetPasswordFail = (error) => ({
  type: actionTypes.RESET_PASSWORD_FAIL,
  error,
});

export const ResetPassword =
  (resetToken, resetPasswordData) => async (dispatch) => {
    try {
      dispatch(ResetPasswordStart());

      const response = await axios.patch(
        `https://e-commerce-backend-production-e87.up.railway.app/api/users/resetPassword/${resetToken}`,
        resetPasswordData
      );
      localStorage.setItem("token", response.data.token);
      dispatch(ResetPasswordSuccess(response.data.token, response.data.user));
    } catch (error) {
      dispatch(ResetPasswordFail(error.response.data.message));
    }
  };
