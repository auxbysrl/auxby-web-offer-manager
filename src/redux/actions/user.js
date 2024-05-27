import {
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL
} from "./types";

import AuthService from "../services/user-service";

export const getUserDetails = () => (dispatch) => {
  return AuthService.getUserDetails().then(
    (response) => {
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: { userDetails: response.data },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: { error: error },
      });

      return Promise.reject(error);
    }
  );
};



