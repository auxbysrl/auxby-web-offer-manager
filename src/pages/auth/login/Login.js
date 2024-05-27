import React, { useState } from 'react';
import '../Auth.scss';
import { useDispatch, useSelector } from "react-redux";
import { login, googleAuth } from "../../../redux/actions/auth";
import { Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { ReactComponent as EditIcon } from '../../../images/google.svg';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Carousel from '../../../components/caroucel/CaroucelComponent';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, sePasswordError] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [successful, setSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoggedIn } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    sePasswordError(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleTermsAcceptedChange = () => {
    setTermsAccepted(!termsAccepted);
    setTermsError(termsAccepted)
    setSuccessful(true)
    setErrorMessage("")
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessful(true)
    setErrorMessage("")
    // Validate email
    if (!email) {

      setEmailError(true);
      return;
    }

    // Validate password
    if (!password) {
      sePasswordError(true);
      return;
    }

    setLoading(true);

    dispatch(login(email, password))
      .then(() => {
        handleLoginSuccess();
      })
      .catch((error) => {
        setLoading(false);
        handleLoginErrors(error);
      });
  };

  const handleLoginSuccess = () => {
    navigate("/dashboard");
    window.location.reload();
    setLoading(false);
    setSuccessful(true);
    setErrorMessage("");
  }

  const handleLoginErrors = (error) => {

    switch (error.response.status) {
      case 401: {
        setSuccessful(false)
        setErrorMessage("Oops! Pare că autentificarea nu a avut succes. Vă rugăm să încercați din nou.")
        return;
      };
      case 423: {
        navigate("/check-email", { state: { email: email, password: password } })
        window.location.reload();
        return;
      };
      default: {
        setSuccessful(false);
        setErrorMessage(error.response.data.message)
        return;
      }
    }
  }

  const onGoogleAuthClicked = () => {
    if (!termsAccepted) {
      setTermsError(true)
      setSuccessful(false)
      setErrorMessage("Vă rugăm să verificați termenii și condițiile!")
      return;
    }

    googleLogin()
  }

  const googleLogin = useGoogleLogin({
    responseType: "id_token",
    onSuccess: tokenResponse => {
      handleGoogleAuth(tokenResponse.access_token)
    },
    onError: error => {
      setSuccessful(false);
      setErrorMessage(error.response.data.message)
    },
  });

  const handleGoogleAuth = (token) => {
    console.log("Token "+token )
    setLoading(true);
    setSuccessful(true)
    setErrorMessage("")
    dispatch(googleAuth(token))
      .then(() => {
        handleLoginSuccess();
      })
      .catch((error) => {
        setLoading(false);
        handleLoginErrors(error)
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

            <div className="login-form">
              <h1>Log in</h1>

              <h2>
                Introduceți detaliile contului dvs. mai jos.
              </h2>

              <Stack
                component="form"
                spacing={3}
                autoComplete="on"
                onSubmit={handleSubmit}
              >

                {errorMessage && (
                  <div className="form-group">
                    <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                      {errorMessage}
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
                  onChange={handleEmailChange} />

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
                <Link to="/forgot-password">
                  <p className="forgot-password"> Ați uitat parola? </p>
                </Link>

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
                  <span>Login</span>
                </LoadingButton>

                <div className="divider">
                  <div className="line"></div>
                  <div className="or">OR</div>
                  <div className="line"></div>
                </div>

                <div className="terms">
                  <Checkbox
                    sx={termsError ? { color: "red", '&.Mui-checked': { color: "red" } } : {}}
                    checked={termsAccepted}
                    onChange={handleTermsAcceptedChange} />
                  <label htmlFor="terms">
                    De acord cu{' '}   <Link to="#"><span className="terms-link">Termeni și condiții</span></Link>
                  </label>
                </div>

                <Button
                  startIcon={<EditIcon style={{ width: "20px", height: "20px" }} />}
                  loading={loading}
                  onClick={onGoogleAuthClicked}
                  style={{
                    borderColor: "#4B86B4",
                    color: "#4B86B4",
                    padding: "10px 20px",
                    fontSize: "18px",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    cursor: 'pointer',
                    textTransform: "inherit"
                  }}
                  variant="outlined">
                  <span>Conectați-vă cu Google</span>
                </Button>
                <br></br>
                <p className="signup">
                  Nu ai cont?{' '}
                  <Link to="/register">  <span className="signup-link">Înregistrează-te</span></Link>
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
