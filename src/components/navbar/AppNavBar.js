import { logout } from "../../redux/actions/auth";
import logoText from '../../images/logo_text.svg';
import React, { useState, useCallback } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography, Button, TextField } from '@mui/material';
import { AccountCircle, AddCircleOutline } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

export default function AppNavBar({ displayInfo }) {

  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logOut = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch]);

  const logoClicked = () => {
    navigate("/");
  };

  const addOfferClicked = () => {
    navigate("/add-offer");
  };

  return (
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Box
          onClick={logoClicked}
          sx={{ display: 'flex', alignItems: 'start', flexGrow: 1 }}>
          {/* <Typography variant="h6" style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 700, fontSize: '40px', lineHeight: '49px', color: '#FEB739', flexGrow: 1 }}>
            Auxby
          </Typography> */}
          <img src={logoText} className="App-logo" alt="logo" style={{ width: 200, height: 50 }} />
        </Box>
        <Box sx={{ flexGrow: 1 }} hidden={!displayInfo.showSearch} marginRight="50px">
          <TextField
            placeholder="Caută-ți oferta"
            type="text"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),

              endAdornment: value && (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setValue("")}
                >
                  <CancelRoundedIcon />
                </IconButton>
              )
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }} gap={3}>
          <Button
            hidden={!displayInfo.showLogOut}
            onClick={logOut}
            style={{ textTransform: "none", color: "#4B86B4" }}>
            <AccountCircle />
            <Typography style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', flexGrow: 1, color: "#4B86B4" }}>
              Deconectați-vă
            </Typography>
          </Button>
          <Button
            hidden={!displayInfo.showAddBtn}
            onClick={addOfferClicked}
            variant="contained" style={{ background: "#4B86B4", borderRadius: "12px", width: "226px", textTransform: "none" }}>
            <Typography style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 600, fontSize: '18px', flexGrow: 1 }}>
              Adaugă anunț
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

