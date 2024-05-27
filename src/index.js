import './index.scss';
import * as React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "@fontsource/montserrat" 
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="156615882044-rdmjaosndk9ovbsno56imkkomgr799bq.apps.googleusercontent.com">
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
  </GoogleOAuthProvider>
);