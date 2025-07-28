import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Routes from "./router";
import "@/sass/main.scss";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
