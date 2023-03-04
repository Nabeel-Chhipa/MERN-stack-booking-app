import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL = 'http://localhost:5000'

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

