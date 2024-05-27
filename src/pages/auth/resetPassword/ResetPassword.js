import React, { useState } from 'react';
import '../Auth.scss';
import logoText from '../../../images/logo_text.svg';
import { useDispatch, useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Carousel from '../../../components/caroucel/CaroucelComponent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelIcon from "@mui/icons-material/Cancel";
import { resetPassword } from "../../../redux/actions/auth";
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';

export default function ResetPassword() {
    const [password, setPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfPassword] = useState('');
    const [confirmPasswordError, setConfPasswordError] = useState('');
    const [loading, setLoading] = React.useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfPassword, setShowConfPassword] = React.useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);
    const url = window.location.href;

    // Parse the URL and retrieve the value of the 'token' parameter
    const urlParams = new URL(url);
    const token = urlParams.searchParams.get('token');


    const handlePasswordChange = (event) => {
        const inputPassword = event.target.value;
        setPassword(inputPassword);
        setPasswordError(false);
        setValidPassword(validatePassword(inputPassword));
        setPasswordsMatch(true)
        setConfPasswordError(false);
    };

    const handleConfPasswordChange = (event) => {
        setConfPassword(event.target.value);
        setConfPasswordError(false);
        setPasswordsMatch(true)
        setPasswordError(false)
    };

    const validatePassword = (inputPassword) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regex.test(inputPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setPasswordError(false)
        if (!password) {
            setPasswordError(true)
            return;
        }

        setConfPasswordError(false)
        if (!confirmPassword) {
            setConfPasswordError(true)
            return;
        }

        if (confirmPassword !== password) {
            setPasswordsMatch(false)
            setConfPasswordError(true)
            setPasswordError(true)
            return;
        } else {
            setPasswordsMatch(true)
        }

        if (token) {
            setLoading(true);
            requestResetPassword(token)
        } else {
            setSuccessful(false);
            setLoading(false);
            setMessage("Ceva nu a mers bine. Vă rugăm să încercați din nou mai târziu.")
        }
    };

    const requestResetPassword = (token) => {
        let resetData = {
            token: token,
            password: password,
            confirmPassword: confirmPassword
        };
        dispatch(resetPassword(resetData))
            .then(() => {
                navigate("/confirmation")
                window.location.reload();
                setSuccessful(true);
                setLoading(false);
            })
            .catch(() => {
                setSuccessful(false);
                setLoading(false);
                setMessage("Ceva nu a mers bine. Vă rugăm să încercați din nou mai târziu.")
            });
    };

    return (
        <div>
            <body>
                <Container
                    maxWidth="sm"
                    sx={{
                        marginTop: "50px",
                        width: "90%"
                    }}>
                    <Stack direction="column" className='reset-password'>
                        <img src={logoText} className="App-logo" alt="logo" style={{ width: 200, height: 100 }} />
                        <br></br>
                        <h1>Schimbă parola</h1>
                        <h2>
                            Creează o parolă nouă pentru contul tău.
                        </h2>

                        <Stack
                            component="form"
                            spacing={3}
                            autoComplete="on"
                            onSubmit={handleSubmit}
                        >
                            {message && (
                                <div className="form-group">
                                    <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <FormControl fullWidth variant="outlined">
                                <InputLabel error={passwordError} htmlFor="outlined-adornment-password">Parola</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={passwordError}
                                    onChange={handlePasswordChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel error={confirmPasswordError} htmlFor="outlined-adornment-password">Confirm Parola</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showConfPassword ? 'text' : 'password'}
                                    error={confirmPasswordError}
                                    onChange={handleConfPasswordChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                            </FormControl>

                            {!validPassword && (
                                <div>
                                    <Stack direction="row" gap={1}>
                                        <CancelIcon style={{ color: "red" }} />
                                        <div>
                                            <p>Parola dvs. trebuie să includă:  </p>
                                            <p> 8 caractere</p>
                                            <p> 1 literă mare</p>
                                            <p> 1 literă mică</p>
                                            <p> 1 număr</p>
                                        </div>
                                    </Stack>
                                </div>
                            )}

                            {!passwordsMatch && (
                                <div>
                                    <Stack direction="row" gap={1}>
                                        <CancelIcon style={{ color: "red" }} />
                                        <p>Parolele nu se potrivesc</p>
                                    </Stack>
                                </div>
                            )}

                            <LoadingButton
                                type="submit"
                                loading={loading}
                                style={{
                                    borderRadius: 8,
                                    backgroundColor: "#4B86B4",
                                    padding: "10px 20px",
                                    fontSize: "18px",
                                    fontFamily: "Montserrat",
                                    fontWeight: "600",
                                    cursor: 'pointer',
                                    textTransform: "capitalize"
                                }}
                                variant="contained">
                                <span>Trimite</span>
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </Container>
            </body>
            <footer>
            </footer>
        </div>
    );
}
