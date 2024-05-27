import React, { useEffect, useState } from 'react';
import '../Auth.scss';
import { useDispatch } from "react-redux";
import logoText from '../../../images/logo_text.svg';
import Stack from '@mui/material/Stack';
import { confirmationAccount } from "../../../redux/actions/auth";
import { Container } from '@mui/material';

export default function ConfirmPage() {
    const url = window.location.href;

    // Parse the URL and retrieve the value of the 'token' parameter
    const urlParams = new URL(url);
    const token = urlParams.searchParams.get('confirmation-token');
    const [successful, setSuccessful] = useState(true);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            requestConfirmAccount(token)
        }
    }, []);

    const requestConfirmAccount = (token) => {
        dispatch(confirmationAccount(token))
            .then(() => {
                setSuccessful(true);
                setMessage("Adresa de email a fost verificată cu succes!")
            })
            .catch(() => {
                setSuccessful(false);
                setMessage("Ceva nu a mers bine. Vă rugăm să încercați din nou mai târziu.")
            });
    };

    return (
        <div className="auth">
            <body>
                <Container
                    maxWidth="sm"
                    sx={{
                        marginTop: "50px",
                        width: "90%"
                    }}>
                    <Stack direction="column" className='reset-password'>

                        {message && (
                            <div className="form-group">
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                       {successful && (
                        <div> <img src={logoText} className="App-logo" alt="logo" style={{ width: 200, height: 100 }} />
                        <br></br>
                        <h1> Avem vești grozave! </h1>
                        <p>Schimbările pe care le-ai solicitat au fost finalizate cu succes!</p>
                        <p> Suntem recunoscători pentru încrederea pe care o arăți și pentru alegerea de a face parte din comunitatea noastră. Te încurajăm să revii în aplicație și să te bucuri de toate facilitățile pe care le-am pregătit pentru tine. Dacă ai nevoie de ajutor sau de mai multe informații, nu ezita să ne scrii. Suntem aici pentru tine!</p>
                        <p>Cu drag, echipa Auxby!</p></div>)}
                    </Stack>
                </Container>
            </body>
            <footer>
            </footer>
        </div>
    );
}
