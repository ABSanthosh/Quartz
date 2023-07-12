import { Fragment, useState } from "react";
import "./Folder.scss";
import { IFolder } from "@/store/models/data.model";
import * as DropMenu from "@/components/UtilInputs/DropMenu/DropMenu";

function Page({ page }: { page: IFolder["pages"][0] }) {
  return (
    <Fragment>
      <li key={page.id} className="Page">
        <button
          className="Page--button"
          data-icon-after={String.fromCharCode(60086)}
        >
          {page.pageName}
        </button>
      </li>
    </Fragment>
  );
}

function Folder({
  folder,
  onClick,
}: {
  folder: IFolder;
  onClick: ({ id }: { id: string; state: boolean }) => void;
}) {
  const [isOnButton, setIsOnButton] = useState(false);
  const { folderName, id, pages, isOpen } = folder;
  return (
    <details className="FolderWrapper" open={isOpen}>
      <summary
        className="Folder"
        onClick={(e) => {
          e.preventDefault();
          if (isOnButton) return false;
          else onClick({ id: id, state: !isOpen });
        }}
      >
        <div className="Folder__left">
          <span
            data-icon={String.fromCharCode(60086)}
            className="Folder__icon"
          />
          <span className="Folder__name">{folderName}</span>
        </div>
        <div className="Folder__right">
          <DropMenu.Root
            align="end"
            triggerButton={
              <button
                data-icon={String.fromCharCode(60028)}
                className="Folder__action"
                data-icon-button
                onMouseEnter={() => setIsOnButton(true)}
                onMouseLeave={() => setIsOnButton(false)}
              />
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
      </summary>

      <ul className="Folder__pages">
        {pages.map((page, index) => (
          <Page page={page} key={index} />
        ))}
      </ul>
    </details>
  );
}

export default Folder;
