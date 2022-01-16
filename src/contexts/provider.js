import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSupabaseLoading } from "../hooks/useSupabaseLoading";
import { AuthContext } from "./context";
import { useStoreActions } from "easy-peasy";
import supabase from "../supabase/supabase-config";
// import { useHistory } from "react-router-dom";

export function AuthProvider({ children }) {
  const [userState, setUserState] = useState(supabase.auth.user());
  const [status, setStatus] = useState(
    supabase.auth.user() !== null ? "loading" : "ready"
  );

  const { stopFBLoading } = useSupabaseLoading();
  const setUser = useStoreActions((action) => action.setUser);
  // let history = useHistory();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        const supaUser = supabase.auth.user();
        setUserState(supaUser);
        setStatus("ready");
        setUser(supaUser);

        // if (event === "SIGNED_IN") {
        //   history.push("/app/dashboard");
        // }
      } else {
        stopFBLoading();
      }
    });
  });

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  });

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
