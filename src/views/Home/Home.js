import "./Home.scss";

import Github from "../../Assets/Img/github.png";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();
  const { login } = useAuth();

  return (
    <div className="Home">
      <div
        onClick={async () => {
          // console.log(await login());
          if ((await login()).status === "success") {
            history.push("/lists");
          }
        }}
        className="Home__githubSignUp"
      >
        <div className="buttonContent">
          <img src={Github} alt="github" />
          <span>Sign Up with Github</span>
        </div>
      </div>
      <div onClick={() => {}} className="Home__githubSignUp">
        <div className="buttonContent">
          <img src={Github} alt="github" />
          <span>Sign In with Github</span>
        </div>
      </div>
    </div>
  );
}
