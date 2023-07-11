import "./Folder.scss";
import { IFolder } from "@/store/models/data.model";

function Folder({
  folderName,
  folderId,
  pages,
  isOpen,
  onClick,
}: IFolder & {
  onClick: (folderId: string) => void;
}) {
  return (
    <li className="FolderWrapper">
      <button
        className={`Folder ${isOpen ? "Folder--open" : ""}`}
        onClick={() => onClick(folderId)}
      >
        <div className="Folder__left">
          <span
            data-icon={String.fromCharCode(60084)}
            className="Folder__icon"
          />
          <span className="Folder__name">{folderName}</span>
        </div>
        <div className="Folder__right">
          <button
            data-icon={String.fromCharCode(60028)}
            className="Folder__action"
            data-icon-button
          />
        </div>
      </button>
      {isOpen && (
        <ul className="Folder__pages">
          {pages.map((page) => (
            <li key={page.pageId} className="Folder__page">
              <button
                className="Folder__pageButton"
                data-icon-after={String.fromCharCode(60086)}
              >
                {page.pageName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Folder;
