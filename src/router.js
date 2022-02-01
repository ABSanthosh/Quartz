import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as views from "./views";
import React from "react";
import StoreNotesMiddleware from "./Components/StoreMiddleware/StoreNotesMiddleware";


export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={views.Home} />
        <StoreNotesMiddleware
          path="/app/dashboard/:mode/:modeId?"
          component={views.Dashboard}
        />
        <Redirect to="/app/dashboard/boards" />
        <Route exact path="*" component={views.Home} />
      </Switch>
    </BrowserRouter>
  );
}
