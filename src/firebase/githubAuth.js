import {firebase} from "./firebase-config";

export const getAuth = () => {
  return firebase.auth();
};

const githubProvider = new firebase.auth.GithubAuthProvider();

export const gitHubAuthSignIn = (setUser) => {
  getAuth()
    .signInWithPopup(githubProvider)
    .then((res) => {
      setUser(res);
    })
    .catch((err) => {
      setUser(err);
    });
};

export const gitHubAuthLink = (setUser) => {
  getAuth()
    .currentUser.linkWithPopup(githubProvider)
    .then((res) => {
      setUser(res);
    })
    .catch((err) => {
      setUser(err);
    });
};
