import "./Lists.scss";

import React from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Lists() {
  const { user } = useAuth();

  return (
    <>
      {user === null ? (
        <div>You have not been auth'd</div>
      ) : (
        <div>
          <p>Hello youve been auth'd</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
