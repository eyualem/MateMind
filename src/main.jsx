// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // 👈 import this
import { AppProvider } from "./context/AppContext.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter> {/* 👈 wrap with router */}
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
