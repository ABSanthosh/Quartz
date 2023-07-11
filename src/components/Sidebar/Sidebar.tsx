import { useState } from "react";
import "./Sidebar.scss";
import {ReactComponent as SidebarIconSVG} from "@/assets/icons/sidebar.left.svg";
import {ReactComponent as OptionsOutlineSVG} from "@/assets/icons/ellipsis.circle.svg";
import * as DropMenu from "@/components/UtilInputs/DropMenu/DropMenu";
import SearchBar from "./components/SearchBar/SearchBar";

export default function Sidebar() {
  const [isNavOpen, toggleNav] = useState(false);

  return (
    <div className={`Sidebar ${isNavOpen ? "Sidebar--open" : ""}`}>
      <div className="Sidebar__logo">QUARTZ</div>
      <div className="Sidebar__leftRight">
        <button
          className={`Sidebar__hamburger ${
            isNavOpen ? "Sidebar__hamburger--open" : ""
          }`}
          onClick={() => toggleNav(!isNavOpen)}
        >
          <SidebarIconSVG />
        </button>
        <DropMenu.Root
          align="end"
          triggerButton={
            <button className="Sidebar__options">
              <OptionsOutlineSVG />
            </button>
          }
        >
          <DropMenu.Item
            onSelect={() => {
              alert("Item 1");
            }}
          >
            Item 1
          </DropMenu.Item>
          <DropMenu.Item>Item 1</DropMenu.Item>
        </DropMenu.Root>
      </div>
      <SearchBar />
      <div className="Sidebar__right">
        <button
          data-icon-button
          title="New Note"
          data-icon={String.fromCharCode(60031)}
        />
        <button
          data-icon-button
          title="New Notebook"
          data-icon={String.fromCharCode(60032)}
        />
      </div>
      <ul className="Sidebar__folders">
        {/* {folders.map((folder) => (
          <Folder
            key={folder.folderId}
            folderName={folder.folderName}
            folderId={folder.folderId}
            pages={folder.pages}
            isOpen={folder.isOpen}
            onClick={openFolder}
          />
        ))} */}
      </ul>
    </div>
  );
}
