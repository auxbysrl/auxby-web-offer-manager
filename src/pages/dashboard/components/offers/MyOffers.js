
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { List, Box, Tab } from "@mui/material";
import { getUserOffers } from "../../../../redux/actions/offers";
import { getUserDetails } from "../../../../redux/actions/user";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Navigate, useNavigate } from 'react-router-dom';
import OfferCard from "../../../../components/offerCard/OfferCardComponent";
import usePagination from "../../../../components/pagination/Pagination";

export default function MyOffers() {
    const { isLoggedIn } = useSelector(state => state.auth);
    const { offers } = useSelector(state => state.offers);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = React.useState("1");

    const [page, setPage] = useState(1);

    const PER_PAGE = 4;
    const count = offers.length > 0 ? Math.ceil(offers.length / PER_PAGE) : 0;
    const displayedOffers = usePagination(offers, PER_PAGE);

    const handlePageChanged = (e, p) => {
        setPage(p);
        displayedOffers.jump(p);
    };

    const handleTabChanged = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        //getUserOffer();
        dispatch(getUserOffers())
    }, []);

    useEffect(() => {
        //getUserDetails();
        dispatch(getUserDetails())
    }, []);

    const handleOfferClick = (id) => {
        navigate("/offer-details", { state: { offerId: id } })
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <Stack
            container
            direction="column"
        >
            {/* <Box sx={{ width: "100%", typography: "body1", marginTop: "10px" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                        <TabList onChange={handleTabChanged} aria-label="Tabs">
                            <Tab
                                label="Oferte active"
                                value="1"
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    maxWidth: 200,
                                    color: "#3B4B53",
                                    "&.Mui-selected": { color: "#4B86B4" },
                                }}
                            />
                            <Tab
                                label="Oferte Inactive"
                                value="2"
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    maxWidth: 200,
                                    color: "#3B4B53",
                                    "&.Mui-selected": { color: "#4B86B4" },
                                }}
                            />
                        </TabList>
                    </Box>
                </TabContext>
            </Box> */}
            {/* <div className="filters-wrapper">
                <p>Filtre : </p>
            </div> */}
            <br></br>
            {offers && offers.length > 0 ? (
                <>
                    <div className="pagination">
                        <Pagination
                            count={count}
                            variant="text"
                            page={page}
                            shape="circular"
                            onChange={handlePageChanged}
                            sx={{
                                "& .Mui-selected": {
                                    color: "#2A4D69",
                                    backgroundColor: "transparent",
                                    border: "1px solid #FEB739",
                                },
                                "& .MuiPaginationItem-root": {
                                    color: "#2A4D69",
                                    "&:hover": {
                                        backgroundColor: "#4B86B4",
                                        color: "#FFFFFF"
                                    },
                                },
                            }}
                        />
                    </div>
                    <List p="10" pt="3" spacing={2}>
                        {displayedOffers.currentData().map(item => {
                            return (
                                    <OfferCard
                                        handleOfferClick={handleOfferClick}
                                        key={item.id}
                                        offerDetails={item} />
                            );
                        })}
                    </List>
                    <div className="pagination">
                        <Pagination
                            count={count}
                            variant="text"
                            page={page}
                            shape="circular"
                            onChange={handlePageChanged}
                            sx={{
                                "& .Mui-selected": {
                                    color: "#2A4D69",
                                    backgroundColor: "transparent",
                                    border: "1px solid #FEB739",
                                },
                                "& .MuiPaginationItem-root": {
                                    color: "#2A4D69",
                                    "&:hover": {
                                        backgroundColor: "#4B86B4",
                                        color: "#FFFFFF"
                                    },
                                },
                            }}
                        />
                    </div>
                </>
            ) : (
                <h2>Nu există oferte disponibile.</h2>
            )}
        </Stack>
    );
}
