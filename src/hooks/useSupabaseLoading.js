import reactDom from "react-dom";
import SupabaseLoader from "../Components/SupabaseLoader/SupabaseLoader";

export function useSupabaseLoading() {
  const startFBLoading = () => {
    if (document.getElementById("loading-dock")) {
      document.getElementById("loading-dock").remove();
    }
    document
      .getElementById("root")
      .insertAdjacentHTML("beforebegin", '<div id="loading-dock"></div>');
    reactDom.render(
      <SupabaseLoader />,
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
