import Header from "../../Components/Header/Header";
import "../../Components/FancyButton/FancyButton.scss";
import "./Home.scss";
import GithubIcon from "../../Assets/Img/Github.png";
import { useAuth } from "../../hooks/useAuth";
import ProtectedPage from "./Components/ProtectedPage/ProtectedPage";
export default function Home() {
  const { login } = useAuth();

  return (
    <ProtectedPage>
      <div className="Home">
        <Header>
          <div
            className="FancyButtonWrapper"
            onClick={async () => {
              await login();
            }}
          >
            Sign in
            <img src={GithubIcon} alt="Github Octocat" />
          </div>
        </Header>
      </div>
    </ProtectedPage>
  );
}
