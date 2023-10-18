import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="decodebetesttentant.eu.auth0.com"
    clientId="Runc5eNG5J3pTXr2sNzkbbqdOOa7SDEm"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: 'test',
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
