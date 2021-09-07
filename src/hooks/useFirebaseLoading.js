import reactDom from "react-dom";
import FirebaseLoader from "../Components/FirebaseLoader/FirebaseLoader";

export function useFirebaseLoading() {
  const startFBLoading = () => {
    if (document.getElementById("loading-dock")) {
      document.getElementById("loading-dock").remove();
    }
    document
      .getElementById("root")
      .insertAdjacentHTML("beforebegin", '<div id="loading-dock"></div>');
    reactDom.render(
      <FirebaseLoader />,
      document.getElementById("loading-dock")
    );
  };

  const stopFBLoading = () => {
    if (document.getElementById("loading-dock")) {
      document.getElementById("loading-dock").remove();
    }
  };

  return { startFBLoading, stopFBLoading };
}
