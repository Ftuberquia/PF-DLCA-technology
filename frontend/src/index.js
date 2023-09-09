import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "../src/redux/store/index";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0Provider } from '@auth0/auth0-react';

// Cambiar para el deploy

// axios.defaults.baseURL = "https://LINK-PARA-DEPLOY";
axios.defaults.baseURL = "http://localhost:3001";

const root = document.getElementById("root");
const rootElement = createRoot(root);

const DarkModeApp = () => {
  const darkMode = useSelector((state) => state.darkMode); // Obtiene el estado de darkMode

//   return (
//     <div className={darkMode ? "dark-mode" : ""}>
//       <App />
//     </div>
//   );
// };

rootElement.render(
  //Povedor de Auth0
  <Auth0Provider
    domain="dev-vcpvqyumxlc4bej4.us.auth0.com"
    clientId="P9AjcmsGFLZ4wjvN4julsYZ7mH3pyCgI"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);

reportWebVitals();
