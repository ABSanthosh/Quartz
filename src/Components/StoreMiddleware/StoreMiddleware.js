import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function StoreMiddleware(props) {
  let history = useHistory();
  const setSelectedNote = useStoreActions((actions) => actions.setSelectedNote);
  const selectedNote = useStoreState((state) => state.selectedNote);
  const setCurrentOption = useStoreActions(
    (actions) => actions.setCurrentOption
  );
  const currentOption = useStoreState((state) => state.currentOption);

  useEffect(() => {
    // check url params for mode
    if (props.computedMatch.params.mode === "notes") {
      // if url param is notes and current option is not notes, set current option to notes
      if (currentOption !== "notes") {
        setCurrentOption("notes");
      }
      // if url param for modeId is defined, set selected note to that note
      // else the note will be set to 0th note from store so just change path to that note
      if (props.computedMatch.params.modeId) {
        setSelectedNote(parseInt(props.computedMatch.params.modeId));
      } else {
        if (selectedNote) {
          history.push(`/app/dashboard/notes/${selectedNote.id}`);
        }
      }
    } else if (props.computedMatch.params.mode === "boards") {
      if (currentOption !== "boards") {
        setCurrentOption("boards");
      }
    }
  });

  return <ProtectedRoute {...props} />;
}

export default StoreMiddleware;