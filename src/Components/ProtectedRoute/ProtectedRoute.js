import { useAuth } from "../../hooks/useAuth";
import Delay from "react-delay";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { userState,status } = useAuth();
  
  if (status === "ready" && userState) {
    return <Route {...props} />;
  }
  if (userState !== null) {
    return (
      <Delay wait={250}>
        <p>Loading...</p>
      </Delay>
    );
  }

  return <Redirect to="/" />;
}
