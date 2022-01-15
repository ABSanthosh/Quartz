import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import supabase from "../../../../supabase/supabase-config";

export default function ProtectedPage({ children }) {
  let history = useHistory();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        window.onload = () => {
          history.push("/app/dashboard");
        };
      }
    });
  });

  return <>{children}</>;
}

ProtectedPage.propTypes = {
  children: PropTypes.node,
};
