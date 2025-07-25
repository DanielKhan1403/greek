import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import "./i18n";
import { Provider } from "react-redux";
import { store }from '/src/app/store.js'; 

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);