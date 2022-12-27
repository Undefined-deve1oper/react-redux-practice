import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import configureStore from "./store/store";
import App from "./App";
import { CssBaseline } from "@mui/material";

const store = configureStore();

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <CssBaseline/>
            <App/>
        </Provider>
    </React.StrictMode>
);