import React, { useState, useEffect } from 'react';
import '../Auth.scss';
import './CheckEmail.scss';
import emailSent from "../../../images/email-sent-icon.svg";
import AuthService from "../../../redux/services/auth-service";
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import Carousel from '../../../components/caroucel/CaroucelComponent';
import { login } from "../../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';

export default function CheckEmail() {
    const [loading, setLoading] = React.useState(false);
    const [successful, setSuccessful] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const email = location.state.email
    const [timerId, setTimerId] = useState(null);
    const [tries, setTries] = useState(0);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        setTimerId(setInterval(startTimer, 4000));
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        const handleBackButton = () => {
            stopTimer()
        };

        window.addEventListener("popstate", handleBackButton);

        return () => window.removeEventListener("popstate", handleBackButton);
    }, [timerId]);

    const resentEmail = (event) => {
        event.preventDefault();
        setLoading(true)
        AuthService.resetPassword(email).then(
            (response) => {
                setLoading(false);
                if (response) {
                    setSuccessful(true)
                    setMessage("Un nou link de resetare a fost trimis la adresa dvs. de e-mail, vă rugăm să vă verificați căsuța de e-mail.")
                } else {
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
    };

    const goToLogin = (event) => {
        stopTimer();
        navigate("/login");
    }

    const startTimer = () => {
        // try to login user
        if (tries == 10) {
            return;
        }
        loginUser(email, location.state.password)
        setTries((tries) => tries + 1);
    };

    const stopTimer = () => {
        clearInterval(timerId);
        setTimerId(null);
    };

    const loginUser = (email, password) => {
        dispatch(login(email, password))
            .then(() => {
                stopTimer();
                navigate("/dashboard");
                window.location.reload();
                setSuccessful(true);
                setMessage("");
            })
            .catch((e) => {
            });
    }

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="auth">
            <body>
                <div className="row">
                    <div className="column left">
                        <Carousel />
                    </div>
                    <div className="column right">
                        <Stack
                            className='check-email'
                            width="50%"
                            margin=" 100px auto;"
                            component="form"
                            spacing={5}
                            alignItems="center"
                            alignSelf="center"
                            autoComplete="on"
                        >

                            <img class="centerImage" src={emailSent} alt="emailSent logo" />
                            {message && (
                                <div className="form-group">
                                    <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <h2>Verifică email-ul</h2>
                            <br></br>
                            <p>Am trimis o link de verificare pe adresa ta de e-mail <span>{email}</span> </p>
                            <p>După verificare, vei fi redirectionat spre pagina principala.</p>

                            <LoadingButton
                                onClick={resentEmail}
                                loading={loading}
                                style={{
                                    marginTop: "100px",
                                    borderRadius: 8,
                                    color: "#4B86B4",
                                    padding: "10px 20px",
                                    fontSize: "18px",
                                    fontFamily: "Montserrat",
                                    fontWeight: "600",
                                    cursor: 'pointer',
                                    borderColor: "#4B86B4",
                                    textTransform: "none"
                                }}
                                variant="outlined">
                                Retrimiteți e-mailul
                            </LoadingButton>
                            <br></br>
                            <p className="signup">
                                <Button onClick={goToLogin} style={{ borderColor: "white", backgroundColor: "white" }} >  <span className="signup-link">Înapoi la Login</span></Button>
                            </p>
                        </Stack>
                    </div>
                </div>
            </body>
            <footer>
            </footer>
        </div>
    );
}
