import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Delay from "react-delay";

export default function ProtectedRoute(props) {
  const { userState } = useAuth();

  return userState !== null ? (
    <>
      <Route {...props} />
      <Redirect to="/lists" {...props} />
    </>
  ) : (
    <Delay wait={250}>
      <p>Loading...</p>
    </Delay>
  );
}
