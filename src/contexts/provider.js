import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSupabaseLoading } from "../hooks/useSupabaseLoading";
import { AuthContext } from "./context";
import { useStoreActions } from "easy-peasy";
import supabase from "../supabase/supabase-config";
import { useHistory } from "react-router-dom";

export function AuthProvider({ children }) {
  const [userState, setUserState] = useState(null);
  const [status, setStatus] = useState("loading");

  const { stopFBLoading } = useSupabaseLoading();
  const storeActions = useStoreActions((action) => action);
  let history = useHistory();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        const supaUser = supabase.auth.user();
        // console.log("supaUser", supaUser);
        setUserState(supaUser);
        setStatus("ready");
        storeActions.setUser(supaUser);

        if (event === "SIGNED_IN") {
          history.push("/app/dashboard");
        }
      } else {
        stopFBLoading();
      }
    });
  }, [storeActions, stopFBLoading]);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);

  async function checkUser() {
    const supaUser = supabase.auth.user();
    setUserState(supaUser);
    if (supaUser) {
      setStatus("ready");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setUserState(null);
  }

  async function login() {
    await supabase.auth.signIn({
      provider: "github",
    });
  }

  const authObject = {
    login,
    logout,
    userState,
    status,
  };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}
AuthProvider.defaultProps = {
  children: null,
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
