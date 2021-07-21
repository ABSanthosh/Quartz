import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as views from "./views";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={views.Home} />
        <ProtectedRoute exact path="/lists" component={views.Lists} />
      </Switch>
    </BrowserRouter>
  );
}
