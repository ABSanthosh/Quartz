import { useAuth } from "../../hooks/useAuth";
import Delay from "react-delay";
import { Redirect, Route } from "react-router-dom";
import { useSupabaseLoading } from "../../hooks/useSupabaseLoading";
import { useEffect } from "react";

export default function ProtectedRoute(props) {
  const { userState, status } = useAuth();
  const { startFBLoading, stopFBLoading } = useSupabaseLoading();

  useEffect(() => {
    if (userState === null) {
      startFBLoading();
    }else{
      stopFBLoading();
    }
  });

  if (status === "ready" && userState) {
    return <Route {...props}>{stopFBLoading()}</Route>;
  }
  if (userState !== null) {
    return <Delay wait={250}></Delay>;
  }

  return <Redirect to="/" />;
}
