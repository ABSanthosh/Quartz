import { useAuth } from "../../hooks/useAuth";
import Delay from "react-delay";
import { Redirect, Route } from "react-router-dom";
import { useSupabaseLoading } from "../../hooks/useSupabaseLoading";

export default function ProtectedRoute(props) {
  const { userState, status } = useAuth();
  const { startFBLoading, stopFBLoading } = useSupabaseLoading();

  if (status === "ready" && userState) {
    return <Route {...props}>{stopFBLoading()}</Route>;
  }
  if (userState !== null) {
    return <Delay wait={250}>{startFBLoading()}</Delay>;
  }

  return <Redirect to="/" />;
}
