import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes";
import SessionProvider from "./contexts/sessionContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SessionProvider>
      <Routes />
    </SessionProvider>
  </React.StrictMode>
);
