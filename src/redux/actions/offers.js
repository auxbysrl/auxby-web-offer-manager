
import {
  USER_OFFERS_SUCCESS,
  USER_OFFERS_FAIL,
  OFFER_DETAILS_SUCCESS,
  OFFER_DETAILS_FAIL,
  CATEGORIES_DETAILS_SUCCESS,
  CATEGORIES_DETAILS_FAIL,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL

} from "./types";
import OfferService from "../../redux/services/offer-service";

export const getUserOffers = () => (dispatch) => {

  return OfferService.getUserOffers().then(
    (data) => {
      dispatch({
        type: USER_OFFERS_SUCCESS,
        payload: {
          offers: data.sort((a, b) => {
            return new Date(b.publishDate) - new Date(a.publishDate);
          })
        },
      });

      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: USER_OFFERS_FAIL,
        payload: { error: error },
      });

      return Promise.reject();
    }
  );
};

export const getOfferDetails = (id) => (dispatch) => {
  return OfferService.getOfferDetails(id).then(
    (data) => {
      dispatch({
        type: OFFER_DETAILS_SUCCESS,
        payload: { offer: data },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: OFFER_DETAILS_FAIL,
        payload: { error: error },
      });

      return Promise.reject(error);
    }
  );
};

export const getCategoriesDetails = () => (dispatch) => {
  return OfferService.getCategoriesDetails().then(
    (data) => {
      console.log(data)
      dispatch({
        type: CATEGORIES_DETAILS_SUCCESS,
        payload: { categoriesDetails: data },
      });

      return Promise.resolve(data);
    },
    (error) => {
      dispatch({
        type: CATEGORIES_DETAILS_FAIL,
        payload: { error: error },
      });
      return Promise.reject(error);
    }
  );
};

export const addNewOffer = (offer) => (dispatch) => {
  return OfferService.addNewOffer(offer).then(
    (data) => {

      return Promise.resolve(data);
    },
    (error) => {

      return Promise.reject(error);
    }
  );
};

export const addOfferImages = (offerId, photoList) => (dispatch) => {

  return OfferService.addOfferImages(offerId, photoList).then(
    (data) => {
      return Promise.resolve(data);
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const deleteOffer = (id) => (dispatch) => {
  return OfferService.deleteOffer(id).then(
    (data) => {
      dispatch({
        type: DELETE_OFFER_SUCCESS,
        payload: {
          offerId: id
        },
      });

      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: DELETE_OFFER_FAIL,
        payload: { error: error },
      });
      return Promise.reject(error);
    }
  );
};

export const editOffer = (offerId, offer) => (dispatch) => {
  return OfferService.editOffer(offerId, offer).then(
    (data) => {
      return Promise.resolve(data);
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const changeStatusOffer = (offerId, requiredCoins) => (dispatch) => {
  return OfferService.changeStatusOffer(offerId, requiredCoins).then(
    (data) => {
      return Promise.resolve(data);
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
