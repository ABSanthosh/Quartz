import "./Home.scss";

import Github from "../../Assets/Img/github.png";
import { useAuth } from "../../hooks/useAuth";
import ProtectedPage from "../../components/ProtectedPage/ProtectedPage";

export default function Home() {
  const { login } = useAuth();

  return (
    <ProtectedPage>
      <div className="Home">
        <div
          onClick={async () => {
            await login();
          }}
          className="Home__githubSignUp"
        >
          <div className="buttonContent">
            <img src={Github} alt="github" />
            <span>Sign Up with Github</span>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
