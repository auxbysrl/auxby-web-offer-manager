import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { getUserOffers, getCategoriesDetails } from "../../redux/actions/offers";
import { getUserDetails } from "../../redux/actions/user";
import Stack from "@mui/material/Stack";
import { Navigate, useNavigate } from 'react-router-dom';
import NavigationMenu from "../../components/navigationMenu/NavigationMenu";
import AppNavBar from "../../components/navbar/AppNavBar";
import MyOffers from "./components/offers/MyOffers";

export default function Dashboard() {
  const { isLoggedIn } = useSelector(state => state.auth);
  const { userDetails } = useSelector(state => state.user);
  const [selectedOption, setSelectedOption] = useState("myOffers");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navbarInfo = {
    showSearch: false,
    showAddBtn: true,
    showLogOut: true
  };

  useEffect(() => {
    //getUserOffer();
    dispatch(getUserOffers())
  }, []);

  useEffect(() => {
    //getUserDetails();
    dispatch(getUserDetails())
  }, []);

  useEffect(() => {
    //getCategoriesDetails();
    dispatch(getCategoriesDetails())
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard">
      <AppNavBar displayInfo={navbarInfo} />
      <Stack container
        direction="column">
        <div className="dashbord-wrapper">
          <div className="user-info-wrapper">
            <NavigationMenu
              userDetails={userDetails}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
            />
          </div>
          <Stack container
            direction="column"
            className="dashboard-container">
            {selectedOption === "myOffers" && <MyOffers />}
            {selectedOption === "profile" && <p>Profile</p>}
            {selectedOption === "buyCoins" && <p>Buy coins</p>}
          </Stack>

        </div>
        <Stack container
          height="100px"
          alignItems="center"
          direction="column">

          {/* <span>Footer</span> */}
        </Stack>
      </Stack>
    </div>
  );
}
