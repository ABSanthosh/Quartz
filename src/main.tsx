import React from "react";
import ReactDOM from "react-dom/client";

import "@/styles/root/global.scss";
import { Router } from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
