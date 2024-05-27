import platformApi from './platformApi';
import authHeader from "./auth-header";

const login = (email, password) => {
  return platformApi
    .post("auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const googleAuth = (accessToken) => {
  return platformApi
    .post("auth/googleAuth", {
      accessToken
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const register = (user) => {
  return platformApi.post("auth/register", user);
};

const sendResetPassword = (email) => {
  return platformApi
    .post("auth/reset-reset-password?email=" + email)
    .then((response) => {
      return response.data;
    });
};

const resetPassword = (resetData) => {
  return platformApi
    .post("auth/reset-password", resetData)
    .then((response) => {
      return response.data;
    });
};

const confirmationAccount = (confToken) => {
  return platformApi
    .post("auth/confirm-account?confirmation-token=" + confToken)
    .then((response) => {
      return response.data;
    });
};

const resendEmail = (email) => {
  return platformApi
    .post("auth/send-verification-link?email=" + email)
    .then((response) => {
      return response.data;
    });
};

const checkEmailExist = (email) => {
  return platformApi
    .get("user/email/check?email=" + email)
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const deleteAccount = () => {
  localStorage.removeItem("user");
  return platformApi
  .delete("user", { headers: authHeader() })
  .then((response) => {
    return response.data;
  });
};

export default {
  login,
  logout,
  register,
  googleAuth,
  resendEmail,
  sendResetPassword,
  resetPassword,
  confirmationAccount,
  deleteAccount,
  checkEmailExist
};
