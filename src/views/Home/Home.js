import Header from "../../Components/Header/Header";
import "../../Components/FancyButton/FancyButton.scss";
import "./Home.scss";
import GithubIcon from "../../Assets/Img/Github.png";
import { useAuth } from "../../hooks/useAuth";
// import ProtectedPage from "./Components/ProtectedPage/ProtectedPage";
import { useHistory } from "react-router-dom";
import FancyButton from "../../Components/FancyButton/FancyButton";

export default function Home() {
  const { login, userState } = useAuth();
  let history = useHistory();

  return (
    // <ProtectedPage>
      <div className="Home">
        <Header>
          {userState === null ? (
            <FancyButton text="" onClick={login}>
              <img src={GithubIcon} alt="Github Octocat" />
              Sign in
            </FancyButton>
          ) : (
            <FancyButton
              text=" Open App →"
              onClick={() => history.push("/app/dashboard")}
            />
          )}
        </Header>
      </div>
    // </ProtectedPage>
  );
}
