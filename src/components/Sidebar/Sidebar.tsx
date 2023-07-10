import React, { useState } from "react";
import "./Sidebar.scss";
import SidebarIconSVG from "../../../public/icons/sidebar.left.svg";
import OptionsOutlineSVG from "../../../public/icons/ellipsis.circle.svg";
import * as DropMenu from "@/components/UtilInputs/DropMenu/DropMenu";
import { useStoreActions, useStoreState } from "@/hooks/useStoreHooks";

export default function Sidebar() {
  // const [isNavOpen, toggleNav] = useState(false);
  const toggleNav = useStoreActions((actions) => actions.ui.toggleNav);
  const isNavOpen = useStoreState((state) => state.ui.isNavOpen);

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
      <ul className="Sidebar__MenuList"></ul>
    </div>
  );
}