import React from "react";
import ReactDOM from "react-dom/client";

import "@/styles/root/global.scss";
import { Router } from "./routes.tsx";
import { StoreProvider } from "easy-peasy";
import { Store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider store={Store}>
      <Router />
    </StoreProvider>
  </React.StrictMode>
);
