import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as views from "./views";
import React from "react";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<views.Home />} />
      </Routes>
    </BrowserRouter>
  );
}
