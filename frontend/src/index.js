import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { createRoot } from 'react-dom/client';

// Cambiar para el deploy
// axios.defaults.baseURL = "https://LINK-PARA-DEPLOY"; 
axios.defaults.baseURL = "http://localhost:3001";

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
