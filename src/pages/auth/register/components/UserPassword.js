import React, { useState } from "react";
import '../../Auth.scss';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../../redux/actions/auth";
import { useNavigate } from 'react-router-dom';

export default function UserPassword({ handleFormData, prevStep, values }) {

    const [password, setPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfPassword] = useState('');
    const [confirmPasswordError, setConfPasswordError] = useState('');
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfPassword, setShowConfPassword] = React.useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);

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

        handleFormData("password")({ target: { value: password } });
        setLoading(true);
        registerUser()
    };

    const registerUser = () => {
        let user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: password,
            phone: values.phone,
            address: {
                country: values.country,
                city: values.city
            }
        };
        dispatch(register(user))
            .then(() => {
                navigate("/check-email", { state: { email: values.email, password: password } })
                window.location.reload();
                setSuccessful(true);
                setLoading(false);
            })
            .catch(() => {
                setSuccessful(false);
                setLoading(false);
            });
    };

    return (
        <div className="auth">
            <div className="login-form">
                <h1>Parola Dvs</h1>
                <br></br>
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
                    <Stack direction="row" gap={1}>
                        <Button
                            onClick={prevStep}
                            style={{
                                borderRadius: 8,
                                color: "#4B86B4",
                                padding: "10px 20px",
                                fontSize: "18px",
                                fontFamily: "Montserrat",
                                fontWeight: "600",
                                cursor: 'pointer',
                                borderColor: "#4B86B4",
                                textTransform: "capitalize"
                            }}
                            variant="outlined">
                            <span>Înapoi</span>
                        </Button>
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
                            <span>Sign Up</span>
                        </LoadingButton>
                    </Stack>
                    <br></br>
                    <p className="signup">
                        Deja înregistrat?{' '}
                        <Link to="/login">  <span className="signup-link">Log in</span></Link>
                    </p>
                </Stack>
            </div>
        </div>
    );
}
