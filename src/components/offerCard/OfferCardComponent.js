import React, { useState, useEffect } from 'react';
import "./OfferCardComponent.scss";
import default_image from "../../images/ic_default_home.svg";
import OfferActionsComponent from '../OfferActions/OfferActionsComponent';

function OfferCard({ offerDetails, handleOfferClick }) {
  const date = new Date(offerDetails.publishDate);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${date.getDate()} ${months[date.getMonth()]
    } ${date.getFullYear()}`;

  return (
    <div className="card-wrapper">
      <div className="home-offer-details" onClick={() => handleOfferClick(offerDetails.id)}>
        <div className="offer-image" >
          {offerDetails.photos && offerDetails.photos.length > 0 ? (
            <img src={offerDetails.photos[0].url} />
          ) : (
            <img src={default_image} />
          )}
        </div>
        <div className="all-details">
          <div className="basic-details">
            <h3>{offerDetails.title}</h3>
            <p>{offerDetails.location}</p>
          </div>
          <div className="extra-details">
            <section className="description-section">
              {offerDetails.description}
            </section>
            <div className="date-price-details">
              <p>{formattedDate}</p>
              <div className="price-details">
                <p>Preț: </p>
                <p>
                  {offerDetails.price} {offerDetails.currencyType}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-actions">
        <OfferActionsComponent offerDetails={offerDetails} />
      </div>
    </div>
  );
}

export default OfferCard;
