import "./Sidebar.scss";
import { ReactComponent as SidebarIconSVG } from "@/assets/icons/sidebar.left.svg";
import { ReactComponent as OptionsOutlineSVG } from "@/assets/icons/ellipsis.circle.svg";
import * as DropMenu from "@/components/UtilInputs/DropMenu/DropMenu";
import SearchBar from "./components/SearchBar/SearchBar";
import { useStoreActions, useStoreState } from "@/hooks/useStoreHooks";
import Folder from "./components/Folder/Folder";
import { IFolder } from "@/store/models/data.model";

export default function Sidebar() {
  // const [isNavOpen, toggleNav] = useState(false);

  const toggleNav = useStoreActions((actions) => actions.ui.toggleNav);
  const isNavOpen = useStoreState((state) => state.ui.isNavOpen);

  const folders = useStoreState((state) => state.data.folders);
  const openFolder = useStoreActions((actions) => actions.data.openFolder);
  const addFolder = useStoreActions((actions) => actions.data.addFolder);
  const addPage = useStoreActions((actions) => actions.data.addPage);
  const currentFolder = useStoreState((state) => state.data.currentFolder);

  return (
    <div className={`Sidebar ${isNavOpen ? "Sidebar--open" : ""}`}>
      <div className="Sidebar__logo">QUARTZ</div>
      <div className="Sidebar__leftRight">
        <button
          className={`Sidebar__hamburger ${
            !isNavOpen ? "Sidebar__hamburger--open" : ""
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
          title="New Page"
          data-icon={String.fromCharCode(60031)}
          onClick={() => {
            if (currentFolder) addPage({ pageName: "New Page" });
            else alert("Select a folder first");
          }}
        />
        <button
          data-icon-button
          title="New Notebook"
          data-icon={String.fromCharCode(60032)}
          onClick={() =>
            addFolder({
              folderName: "New Folder",
            })
          }
        />
      </div>
      <ul className="Sidebar__folders">
        {Object.keys(folders).map((folderId: string) => {
          const folder = folders[folderId as keyof typeof folders];
          return (
            <Folder
              key={folderId}
              folder={{ ...folder, id: folderId } as IFolder & { id: string }}
              onClick={openFolder}
            />
          );
        })}
      </ul>
    </div>
  );
}
