import { Fragment, useEffect, useRef, useState } from "react";
import "./Folder.scss";
import { IFolder } from "@/store/models/data.model";
import * as DropMenu from "@/components/UtilInputs/DropMenu/DropMenu";
import * as ContextMenu from "@/components/UtilInputs/ContextMenu/ContextMenu";
import { useStoreActions } from "@/hooks/useStoreHooks";

function Page({
  page,
  folderId,
}: {
  page: IFolder["pages"][0] & { id: string };
  folderId: string;
}) {
  const [isRename, setIsRename] = useState(false);
  const [pageName, setPageName] = useState(page.pageName);
  const renamePage = useStoreActions((actions) => actions.data.renamePage);
  const deletePage = useStoreActions((actions) => actions.data.deletePage);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRename) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isRename, inputRef]);

  return (
    <li className="Page">
      <ContextMenu.Root
        trigger={
          <Fragment>
            {isRename ? (
              <input
                className="Page--input"
                autoFocus
                ref={inputRef}
                onBlur={() => {
                  setIsRename(false);
                  setPageName(page.pageName);
                }}
                onFocus={(e) => e.target.select()}
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    renamePage({
                      folderId: folderId,
                      pageId: page.id,
                      pageName: pageName,
                    });
                    setIsRename(false);
                  }
                  if (e.key === "Escape") {
                    setIsRename(false);
                    setPageName(page.pageName);
                  }
                }}
              />
            ) : (
              <button
                className="Page--button"
                data-icon-after={String.fromCharCode(60086)}
              >
                {page.pageName}
              </button>
            )}
          </Fragment>
        }
      >
        <ContextMenu.Content>
          <ContextMenu.Item
            onClick={() => setIsRename(true)}
            data-icon={String.fromCharCode(60019)}
          >
            Rename
          </ContextMenu.Item>
          <ContextMenu.Item
            data-icon={String.fromCharCode(60033)}
            onClick={() => deletePage({ folderId: folderId, pageId: page.id })}
          >
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </li>
  );
}

function Folder({
  folder,
  onClick,
}: {
  folder: IFolder & { id: string };
  onClick: ({ id }: { id: string; state: boolean }) => void;
}) {
  const [isOnButton, setIsOnButton] = useState(false);
  const [isRename, setIsRename] = useState(false);
  const { folderName, id, pages, isOpen } = folder;
  const renameFolder = useStoreActions((actions) => actions.data.renameFolder);
  const [editFolderName, setEditFolderName] = useState(folderName);
  const inputRef = useRef<HTMLInputElement>(null);
  const deleteFolder = useStoreActions((actions) => actions.data.deleteFolder);

  useEffect(() => {
    if (isRename) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isRename, inputRef]);

  return (
    <details className="FolderWrapper" open={isOpen}>
      <summary
        className="Folder"
        onClick={(e) => {
          e.preventDefault();
          if (isOnButton) return false;
          else if (isRename) return false;
          else onClick({ id: id, state: !isOpen });
        }}
      >
        {isRename ? (
          <input
            className="Folder--input"
            autoFocus
            ref={inputRef}
            onBlur={() => {
              setIsRename(false);
            }}
            onFocus={(e) => e.target.select()}
            value={editFolderName}
            onChange={(e) => {
              setEditFolderName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                renameFolder({ folderId: id, folderName: editFolderName });
                setIsRename(false);
                setEditFolderName(folderName);
              }
              if (e.key === "Escape") {
                setIsRename(false);
                setEditFolderName(folderName);
              }
            }}
          />
        ) : (
          <Fragment>
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
                    setIsRename(true);
                  }}
                  data-icon={String.fromCharCode(60019)}
                >
                  Rename
                </DropMenu.Item>
                <DropMenu.Item onSelect={() => deleteFolder({ folderId: id })}>
                  Delete
                </DropMenu.Item>
              </DropMenu.Root>
            </div>
          </Fragment>
        )}
      </summary>

      <ul className="Folder__pages">
        {Object.keys(pages).length > 0 ? (
          Object.keys(pages).map((pageId: string) => {
            const page = pages[pageId as keyof typeof pages];
            return (
              <Page
                key={pageId}
                page={{
                  ...page,
                  id: pageId,
                }}
                folderId={id}
              />
            );
          })
        ) : (
          <li className="Page--empty">No pages</li>
        )}
      </ul>
    </details>
  );
}

export default Folder;
