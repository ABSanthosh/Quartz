import React, { useState } from "react";
import "./Sidebar.scss";
import SidebarIconSVG from "../../../public/icons/sidebar.left.svg";
import OptionsOutlineSVG from "../../../public/icons/ellipsis.circle.svg";
import * as DropMenu from "@/components/UtilInputs/DropMenu/DropMenu";

export default function Sidebar() {
  const [navState, setNavState] = useState(false);

  return (
    <div className={`Sidebar ${navState ? "Sidebar--open" : ""}`}>
      <div className="Sidebar__logo">QUARTZ</div>
      <div className="Sidebar__leftRight">
        <button
          className={`Sidebar__hamburger ${
            navState ? "Sidebar__hamburger--open" : ""
          }`}
          onClick={() => setNavState(!navState)}
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
      <ul className="Sidebar__MenuList"></ul>
    </div>
  );
}
