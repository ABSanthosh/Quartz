import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as views from "./views";
import React from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

export default function Router() {
  return (
    // TODO: Add /app route and let the landing page be the home page
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={views.Home} />
        {/* <ProtectedRoute exact path="/boards" component={views.Boards} /> */}
        <ProtectedRoute exact path="/app/dashboard" component={views.Dashboard} />
        <Route exact path="*" component={views.Home} />
      </Switch>
    </BrowserRouter>
  );
}
