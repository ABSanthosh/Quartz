import "./Lists.scss";

import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Github from "../../Assets/Img/github.png";
import { useHistory } from "react-router-dom";
import { getAuth } from "../../firebase/githubAuth";

export default function Lists() {
  const { userState, logout } = useAuth();

  let history = useHistory();
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user === null) {
        history.push("/");
      }
    });
  });

  console.log(userState);
  return (
    <div>
      <div>
        <p>Hello youve been auth'd</p>
        <pre>{JSON.stringify(userState, null, 2)}</pre>
      </div>
      <div
        onClick={async () => {
          await logout();
        }}
        className="Home__githubSignUp"
      >
        <div className="buttonContent">
          <img src={Github} alt="github" />
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
}
