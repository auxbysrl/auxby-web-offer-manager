import React, { useState } from 'react';
import '../Auth.scss';
import TextField from '@mui/material/TextField';
import AuthService from "../../../redux/services/auth-service";
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import Carousel from '../../../components/caroucel/CaroucelComponent';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccessful(true)
        setMessage("")
        // Validate email
        if (!email) {
            setEmailError(true);
            return;
        }

        setLoading(true);
        checkEmailExist(email)
    };

    const checkEmailExist = (email) => {
        AuthService.resetPassword(email).then(
            (response) => {
                setLoading(false);
                if (response) {
                    setSuccessful(true)
                    setEmail("")
                    setMessage("Un link de resetare a fost trimis la adresa dvs. de e-mail, vă rugăm să vă verificați căsuța de e-mail.")
                } else {
                    setEmailError(true);
                    setSuccessful(false)
                    setMessage("A aparut o problema. Vă rugăm să încercați din nou.")
                }
            },
            (error) => {
                const message = error.toString();
                setSuccessful(false);
                setMessage(message);
                setLoading(false);
            }
        );
    }

    return (
        <div className="auth">
            <body>
                <div className="row">
                    <div className="column left">
                        <Carousel />
                    </div>
                    <div className="column right">

                        <div className="login-form">
                            <h1>Aţi uitat parola</h1>
                            <h2>
                                Linkul de resetare a parolei a fost trimis la adresa ta de e-mail.
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
                                <TextField
                                    fullWidth
                                    error={emailError}
                                    type='email'
                                    id="outlined-basic"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={handleEmailChange} />

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
                                        textTransform: "inherit"
                                    }}
                                    variant="contained">
                                    <span>Trimite linkul de resetare</span>
                                </LoadingButton>
                                <br></br>
                                <p className="signup">
                                    <Link to="/login">  <span className="signup-link">Înapoi la Login</span></Link>
                                </p>
                            </Stack>
                        </div>
                    </div>
                </div>
            </body>
            <footer>
            </footer>
        </div>
    );
}
