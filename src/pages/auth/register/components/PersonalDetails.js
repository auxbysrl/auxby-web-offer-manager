import React, { useState } from "react";
import '../../Auth.scss';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import AuthService from "../../../../redux/services/auth-service";

export default function PersonalDetails({ nextStep, handleFormData, values }) {

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [successful, setSuccessful] = useState(false);
    const [messageError, setMessageError] = useState('');

    const handleInputData = input => e => {
        setFirstNameError(false);
        setEmailError(false);
        setLastNameError(false);
        setPhoneError(false);

        handleFormData(input)({ target: { value: e.target.value } });
    }

    const handleNext = (event) => {
        event.preventDefault();

        if (!values.firstName) {
            setFirstNameError(true);
            return;
        }

        // Validations
        if (!values.lastName) {
            setLastNameError(true);
            return;
        }

        if (!values.email) {
            setEmailError(true);
            return;
        }

        if (!validatePhoneNumber(values.phone)) {
            setPhoneError(true);
            return;
        }

        setLoading(true);
        setSuccessful(true)
        setMessageError("")
        checkEmailExist();
    };

    const validatePhoneNumber = (phoneNumber)=> {
        const regex = /^[+]?[0-9]{9,13}$/;
        return regex.test(phoneNumber);
    }

    const checkEmailExist = () => {
        AuthService.checkEmailExist(values.email).then(
            (response) => {
                setLoading(false);
                if (response) {
                    setEmailError(true);
                    setSuccessful(false)
                    setMessageError("Acest email este deja asociat unui cont.")
                } else {
                    setSuccessful(true)
                    setMessageError("")
                    nextStep();
                }
            },
            (error) => {
                const message = error.toString();
                setSuccessful(false);
                setMessageError(message);
                setLoading(false);
            }
        );
    }

    return (
        <div className="auth">
            <div className="login-form">
                <h1>Creează cont</h1>

                <h2>
                    Înscrieți-vă gratuit și deveniți membru.
                </h2>

                <Stack
                    component="form"
                    spacing={3}
                    autoComplete="on"
                    onSubmit={handleNext}
                >
                    {messageError && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {messageError}
                            </div>
                        </div>
                    )}
                    <TextField
                        fullWidth
                        error={firstNameError}
                        type='text'
                        id="outlined-basic"
                        label="Nume"
                        name="firstName"
                        variant="outlined"
                        defaultValue={values.firstName}
                        onChange={handleInputData("firstName")} />

                    <TextField
                        fullWidth
                        error={lastNameError}
                        type='text'
                        id="outlined-basic"
                        label="Prenume"
                        name="lastName"
                        variant="outlined"
                        defaultValue={values.lastName}
                        onChange={handleInputData("lastName")} />

                    <TextField
                        fullWidth
                        error={emailError}
                        type='email'
                        id="outlined-basic"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        defaultValue={values.email}
                        onChange={handleInputData("email")} />

                    <TextField
                        fullWidth
                        error={phoneError}
                        type=''
                        id="outlined-basic"
                        label="Telefon"
                        name="phone"
                        autoComplete="phone"
                        variant="outlined"
                        defaultValue={values.phone}
                        onChange={handleInputData("phone")} />

                    <TextField
                        fullWidth
                        type='text'
                        id="outlined-basic"
                        label="Țară"
                        name="country"
                        variant="outlined"
                        defaultValue={values.country}
                        onChange={handleInputData("country")} />

                    <TextField
                        fullWidth
                        type='text'
                        id="outlined-basic"
                        label="Oraș"
                        name="city"
                        variant="outlined"
                        defaultValue={values.city}
                        onChange={handleInputData("city")} />

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
                        <span>Următorul</span>
                    </LoadingButton>
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
