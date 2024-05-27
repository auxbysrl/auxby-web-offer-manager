import "./OfferDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { getOfferDetails } from "../../redux/actions/offers";
import { Navigate, useLocation } from 'react-router-dom';
import AppNavBar from "../../components/navbar/AppNavBar";
import { Box, Stack } from "@mui/material";
import Grid from '@mui/material/Grid';
import IconPin from "../..//images/ic_map_pin.svg";
import IconCalendar from "../../images/ic_calendar.svg";
import IconEye from "../..//images/ic_eye.svg";
import IconFavorite from "../../images/ic_favorite.svg";
import DefaultImage from "../..//images/ic_default_home.svg";
import IconClock from "../../images/ic_clock.svg";
import IconBids from "../../images/ic_bids.svg";
import { format } from 'date-fns';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import OfferActionsComponent from "../../components/OfferActions/OfferActionsComponent";

export default function OfferDetails() {
  const { isLoggedIn } = useSelector(state => state.auth);
  const { offer } = useSelector(state => state.offers);
  const [timeLeft, setTimeLeft] = useState('...');
  const location = useLocation();
  const dispatch = useDispatch();

  const offerId = location.state ? location.state.offerId : ""

  const navbarInfo = {
    showSearch: false,
    showAddBtn: true,
    showLogOut: true
  };
  useEffect(() => {
    //getOfferDetails();
    dispatch(getOfferDetails(offerId))
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = format(date, 'd MMMM yyyy');
    return formattedDate;
  };

  const getImages = (photos) => {
    if (photos.length === 0) {
      return [{ original: DefaultImage }];
    } else {
      return photos.map((photo) => ({
        original: photo.url,
      }));
    }
  }

  const getCurrency = (currencyType) => {
    if (currencyType == "EURO") {
      return "€"
    } else {
      return "lei"
    }
  }

  useEffect(() => {
    if (offer) {
      const interval = setInterval(() => {
        const now = moment();
        const end = moment(offer.auctionEndDate);

        if (now.isBefore(end)) {
          // auction is ongoing
          const duration = moment.duration(end.diff(now));
          setTimeLeft(`${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s | ${end.format('dddd, h:mm a')}`);
        } else {
          // auction has ended
          setTimeLeft('Licitația s-a încheiat');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [offer]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (

    <Stack container direction="column">
      <AppNavBar displayInfo={navbarInfo} />
      <Box sx={{ display: 'flex', justifyContent: 'center', background: "rgba(59, 75, 83, 0.05);", padding: "40px" }}>
        {offer ? (
          <Stack
            width="100vh"
            container
            direction="column" spacing={4}>
            <Box
              className="offer-header"
            >
              <Stack
                direction="row"
                spacing={3}
                className="share-and-save">
                {/* <img onClick={onShareClicked} src={IconShare} alt="share" /> */}
                <Stack
                  direction="row"
                  spacing={3}
                  className="favorite"
                >
                  <img src={IconFavorite} alt="favorite" />
                  <p className="no-of-saves">{offer.setAsFavoriteNumber}</p>
                </Stack>
              </Stack>

              <ImageGallery items={getImages(offer.photos)}
                showThumbnails={false}
                showBullets={true}
                additionalClass="image-gallery"
                onErrorImageURL={DefaultImage}
                showIndex={true}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </Box>
            <Stack
              className="offer-details"
              direction="column" spacing={2}>
              <p className="offer-title">{offer.title}</p>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2} sm={4} md={4}>
                  <Stack container direction="row" gap={3}>
                    <img src={IconPin} alt="location" />
                    <p className="offer-details-header">{offer.location}</p>
                  </Stack>
                </Grid>

                <Grid item xs={2} sm={4} md={4}>
                  <Stack container direction="row" gap={3}>
                    <p className="offer-details-header">|</p>
                    <img src={IconCalendar} alt="date" />
                    <p className="offer-details-header">{formatDate(offer.publishDate)}</p>
                  </Stack>
                </Grid>

                <Grid
                  item xs={2} sm={4} md={4}>
                  <Stack container direction="row" gap={3}>
                    <p className="offer-details-header">|</p>
                    <img src={IconEye} alt="views" />
                    <p className="offer-details-header">{offer.viewsNumber}</p>
                  </Stack>
                </Grid>
              </Grid>

              <span className="line-divider"></span>
              {offer.isOnAuction ? (
                <>
                  <Grid container alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={5}>
                      <Stack container direction="column" alignItems="center">
                        <p className="auction-title">Prețul de pornire</p>
                        <p className="auction-value">{offer.price}{getCurrency(offer.currencyType)}</p>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack container alignItems="center">
                        <span className="line-vertical-divider"></span>
                      </Stack>
                    </Grid>
                    <Grid item xs={5}>
                      <Stack container direction="column" alignItems="center">
                        <p className="auction-title">Oferta curentă</p>
                        <p className="auction-value">{offer.highestBid}{getCurrency(offer.currencyType)}</p>
                      </Stack>
                    </Grid>
                  </Grid>
                  <span className="line-divider"></span>
                  <Stack containter direction="row" gap={3}>
                    <img src={IconClock} alt="clock" />
                    <p className="title">{timeLeft}</p>
                  </Stack>
                  <Stack containter direction="row" gap={3}>
                    <img src={IconBids} alt="bids" />
                    <p className="title">{[...new Set(offer.bids.map(q => q.userName))].length} participati la licitație</p>
                  </Stack>
                </>
              ) : (
                <Grid container spacing={2}>
                  <Grid xs={10}>
                    <p className="title">Preț</p>
                  </Grid>
                  <Grid xs={2}>
                    <p className="price-value">{offer.price}{getCurrency(offer.currencyType)}</p>
                  </Grid>
                </Grid>
              )}
              {offer.details.length > 0 && (
                <>
                  <span className="line-divider"></span>
                  <Grid
                    className="category-details"
                    container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(offer.details).map((category, index) => (
                      <Grid xs={2} sm={4} md={4} key={index}>
                        <Stack
                          className="category-details-item"
                          container direction="column">
                          <p className="details-title">{category.key}</p>
                          <p className="details-value"> {category.value}</p>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
              <span className="line-divider"></span>
              <Stack container direction="column">
                <p className="title">
                  Descriere
                </p>
                <p className="description">
                  {offer.description}
                </p>
              </Stack>
              <span className="line-divider"></span>

              <p>Lot. {offer.id}</p>
            </Stack>
            <div className="card-actions">
              <OfferActionsComponent offerDetails={offer} />
            </div>
          </Stack>
        ) : (
          <h2>Loading...</h2>
        )}
      </Box></Stack>
  );
}
