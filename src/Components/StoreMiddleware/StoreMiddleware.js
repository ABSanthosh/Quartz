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
  const selectedBoard = useStoreState((state) => state.selectedBoard);
  const setSelectedBoard = useStoreActions(
    (actions) => actions.setSelectedBoard
  );
  // const boards = useStoreState((state) => state.boards);

  useEffect(() => {
    // if url param is notes and current option is not notes, set current option to notes
    if (props.computedMatch.params.mode === "notes") {
      if (currentOption !== "notes") {
        setCurrentOption("notes");
      }
      // if url param for modeId is defined, set selected note to that note
      // else the note will be set to 0th note from store so just change path to that note
      if (props.computedMatch.params.modeId) {
        if (
          selectedNote &&
          selectedNote.id !== parseInt(props.computedMatch.params.modeId)
        ) {
          setSelectedNote(parseInt(props.computedMatch.params.modeId));
          history.push(
            `/app/dashboard/notes/${props.computedMatch.params.modeId}`
          );
        }
      } else if (selectedNote) {
        history.push(`/app/dashboard/notes/${selectedNote.id}`);
      }

      if (
        selectedNote &&
        props.computedMatch.params.modeId !== `${selectedNote.id}`
      ) {
        history.push(`/app/dashboard/notes/${selectedNote.id}`);
      }
    } else if (props.computedMatch.params.mode === "boards") {
      setCurrentOption("boards");
      if (props.computedMatch.params.modeId && selectedBoard === null) {
        setSelectedBoard(parseInt(props.computedMatch.params.modeId));
      }

      if (
        props.computedMatch.params.modeId &&
        selectedBoard &&
        selectedBoard.id !== props.computedMatch.params.modeId
      ) {
        setSelectedBoard(parseInt(props.computedMatch.params.modeId));
      }
    }
  });



  return <ProtectedRoute {...props} />;
}

export default StoreMiddleware;
