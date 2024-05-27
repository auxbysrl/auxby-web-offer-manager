import React from "react";
import "./NavigationMenu.scss";
import coin from "../../images/coin-icon.svg";
import user from "../../images/user-icon.svg";
import default_image from "../../images/ic_default_home.svg";
import rectangle from "../../images/rectangle.svg";
import card from "../../images/credit-card-icon.svg";

function NavigationMenu({ userDetails, selectedOption, handleOptionChange }) {
  return (
    <div className="user-info">
      <div className="user-details">
        {userDetails ? (
          <img src={userDetails.avatar} style={{ width: 60, height: 60 ,  objectFit: 'cover'}}  alt="avatar" />
        ) : (
          <img src={default_image} />
        )}
        {userDetails ? (
          <div className="user-contacts">

            <p className="p1">{userDetails.lastName} {userDetails.firstName}</p>
            <p className="p2">{userDetails.email}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="user-nav-items">
        <div className="coins-info">
          {userDetails ? (
            <p>Monede disponibile : {userDetails.availableCoins}</p>
          ) : (
            ""
          )}
          <img src={coin} alt="coin" />
        </div>
        <button
          className={selectedOption === 'myOffers' ? 'selected-item' : 'nav-item'}
          onClick={() => handleOptionChange("myOffers")}
        >
          <img src={rectangle} alt="my-offers" />
          Offertele mele
        </button>
        {/* <button
          className={selectedOption === 'profile' ? 'selected-item' : 'nav-item'}
          onClick={() => handleOptionChange("profile")}
        >
          <img src={user} alt="profile" />
          Profil
        </button> */}
        {/* <button
          className={selectedOption === 'buyCoins' ? 'selected-item' : 'nav-item'}
          onClick={() => handleOptionChange("buyCoins")}
        >
          <img src={card} alt="my-offers" />
          Cumpara coins
        </button> */}
        {/* <button className="nav-item">
          <img src={settings} alt="my-offers" />
          Setari
        </button> */}
      </div>
    </div>
  );
}

export default NavigationMenu;
