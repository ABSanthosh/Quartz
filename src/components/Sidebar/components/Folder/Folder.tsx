import { Fragment, useState } from "react";
import "./Folder.scss";
import { IFolder } from "@/store/models/data.model";
import * as DropMenu from "@/components/UtilInputs/DropMenu/DropMenu";

function Page({ page }: { page: IFolder["pages"][0] }) {
  return (
    <Fragment>
      <li key={page.pageId} className="Page">
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
  folderName,
  folderId,
  pages,
  isOpen,
  onClick,
}: IFolder & {
  onClick: ({ folderId }: { folderId: string }) => void;
}) {
  const [isOnButton, setIsOnButton] = useState(false);
  console.log(isOpen);
  return (
    <details
      className="FolderWrapper"
      open={isOpen}
      onClick={() => !isOnButton && false}
    >
      <summary
        className="Folder"
        onClick={() => !isOnButton && onClick({ folderId: folderId })}
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
        {pages.map((page) => (
          <Page page={page} />
        ))}
      </ul>
      {/* )} */}
    </details>
  );
}

export default Folder;
