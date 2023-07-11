import { Action, action } from "easy-peasy";

export interface IFolder {
  folderName: string;
  folderId: string;
  isOpen: boolean;
  pages: {
    pageName: string;
    pageId: string;
  }[];
}

export interface IDataModel {
  folders: IFolder[];
  openFolder: Action<IDataModel, { folderId: string }>;
}

export const dataModel = {
  folders: [
    {
      folderName: "Folder 1",
      folderId: "1",
      isOpen: false,
      pages: [
        {
          pageName: "Page 1",
          pageId: "1",
        },
        {
          pageName: "Page 2",
          pageId: "2",
        },
        {
          pageName: "Page 3",
          pageId: "3",
        },
      ],
    },
  ],
  openFolder: action<IDataModel>(
    (
      state,
      payload: {
        folderId: string;
      }
    ) => {
      state.folders = state.folders.map((folder) => {
        if (folder.folderId === payload.folderId) {
          return {
            ...folder,
            isOpen: !folder.isOpen,
          };
        }

        return folder;
      });
    }
  ),
};
