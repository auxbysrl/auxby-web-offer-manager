
import {
  USER_OFFERS_SUCCESS,
  USER_OFFERS_FAIL,
  OFFER_DETAILS_SUCCESS,
  OFFER_DETAILS_FAIL,
  CATEGORIES_DETAILS_SUCCESS,
  CATEGORIES_DETAILS_FAIL,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL
} from "../actions/types";

// Define your initial state value
const initialState = {
  offers: [],
  offer: null,
  categoriesDetails: [],
  error: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case USER_OFFERS_SUCCESS:
      return {
        ...state,
        offers: payload.offers,
        error: null
      };
    case USER_OFFERS_FAIL:
      return {
        ...state,
        offers: null,
        error: payload.error
      };
    case OFFER_DETAILS_SUCCESS:
      return {
        ...state,
        offer: payload.offer,
        error: null
      };
    case OFFER_DETAILS_FAIL:
      return {
        ...state,
        offer: null,
        error: payload.error
      };
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        offers: state.offers.filter(item => item.id !== payload.offerId),
        error: null
      };
    case DELETE_OFFER_FAIL:
      return {
        ...state,
        error: payload.error
      };
    case CATEGORIES_DETAILS_SUCCESS:
      return {
        ...state,
        categoriesDetails: payload.categoriesDetails,
        error: null
      };
    case CATEGORIES_DETAILS_FAIL:
      return {
        ...state,
        categoriesDetails: null,
        error: payload.error
      };
    default:
      return state;
  }
}


