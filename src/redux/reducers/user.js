import {
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../actions/types";


const initialState = {}
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: payload.userDetails,
        error: null
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        userDetails: null,
        error: payload.error
      };
    default:
      return state;
  }
}