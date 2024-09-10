// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

// Replace this with your actual Google Client ID
const googleClientId = '900056680881-m0pm5ohnol1q4ot2ujd25snlfck4ui3o.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <App />
  </GoogleOAuthProvider>
);
