import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import App from "./App";
import ImageProvider from "./components/Context/ImageProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <BrowserRouter>
                <ImageProvider>
                    <App />
                </ImageProvider>
            </BrowserRouter>
        </GlobalStyles>
    </React.StrictMode>
);
