import React, { useState } from "react";
import PropTypes from "prop-types";
import "./HomeModalDialog.scss";
import { ControlIconsDefinitions } from "../../../../../../../Assets/Font/IconMap";
import SmallContentEditable from "../../../../../../../Components/SmallContentEditable/SmallContentEditable";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";

function HomeModalDialog({ closeDialog }) {
  const [title, setTitle] = useState("");
  const [preset, setPreset] = useState("Empty");
  const setSelectedBoard = useStoreActions(
    (actions) => actions.setSelectedBoard
  );
  const addBoard = useStoreActions((actions) => actions.addBoard);
  const history = useHistory();
  return (
    <div className="HomeModalDialogWrapper">
      <div className="HomeModalDialogWrapper__top">
        <div className="HomeModalDialogWrapper__top--left">
          Create New Board
        </div>
        <div className="HomeModalDialogWrapper__top--right">
          <span
            className="controlIcons"
            style={{ fontSize: "14px", cursor: "pointer" }}
            onClick={() => {
              closeDialog(false);
            }}
          >
            {ControlIconsDefinitions.ChromeClose}
          </span>
        </div>
      </div>
      <div className="HomeModalDialogWrapper__bottom">
        <div className="HomeModalDialogWrapper__bottom--boardName">
          <span className="HomeModalDialogWrapper__bottom--boardName--label">
            Board Name
          </span>
          <SmallContentEditable
            html={title}
            setOptionalEllipsis={() => {}}
            setNewValue={(newValue) => {
              setTitle(newValue);
              // setSelectedBoardTitle({
              //   id: board.id,
              //   title: newValue,
              // });
            }}
            style={{
              color: "black",
              width: "100%",
              maxWidth: "unset",
              border: "1px solid gray",
              borderRadius: "5px",
              fontWeight: "normal",
            }}
          />
        </div>

        <div className="HomeModalDialogWrapper__bottom--presetSelector">
          <span className="HomeModalDialogWrapper__bottom--presetSelector--label">
            Select a preset template
          </span>
          <select
            onChange={(e) => {
              setPreset(e.target.value);
            }}
          >
            <option>Empty</option>
            <option>Basic Kanban</option>
          </select>
        </div>

        <div className="HomeModalDialogWrapper__bottom--submit">
          <button
            onClick={() => {
              const newBoardId = new Date().getTime();
              addBoard({
                id: newBoardId,
                title: DOMPurify.sanitize(title),
                preset: preset.replace(" ", ""),
              });
              closeDialog(false);
              setSelectedBoard(newBoardId);
              history.push(`/app/dashboard/boards/${newBoardId}`);
            }}
            disabled={title === "" ? true : false}
          >
            Create Board
          </button>
        </div>
      </div>
    </div>
  );
}

HomeModalDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
};

HomeModalDialog.defaultProps = {
  // bla: 'test',
};

export default HomeModalDialog;
