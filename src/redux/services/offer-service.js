import offerApi from './offerApi';
import platformApi from './platformApi';
import authHeader from "./auth-header";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUserOffers = () => {
  return offerApi
    .get("product/user/my-offers", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getOfferDetails = (id) => {
  return offerApi
    .get("product/" + id, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getCategoriesDetails = () => {
  return platformApi
    .get("category/details", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const addNewOffer = (offer) => {
  return offerApi
    .post("product", offer, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const addOfferImages = (offerId, photoList) => {
  const formData = new FormData();
  photoList.forEach((photo) => {
    formData.append("files", photo);
  });

  return offerApi
    .post("product/upload/" + offerId, formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      return response.data;
    });
};

const deleteOffer = (offerId) => {
  return offerApi
    .delete("product/" + offerId,
      { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const editOffer = (offerId, offer) => {
  return offerApi
    .put("product/" + offerId, offer, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};


const changeStatusOffer = (offerId, coins) => {
  return offerApi
    .put("product/" + offerId + "/changeStatus", { requiredCoins: coins }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

export default {
  getUserOffers,
  getOfferDetails,
  getCategoriesDetails,
  addNewOffer,
  addOfferImages,
  deleteOffer,
  editOffer,
  changeStatusOffer
};