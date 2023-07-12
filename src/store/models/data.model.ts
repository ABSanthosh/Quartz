import { nanoid } from "@/utils/nanoid";
import { Action, action } from "easy-peasy";

export const Tags = [
  {
    name: "Red",
    color: "#FF3635",
  },
  {
    name: "Orange",
    color: "#FF9400",
  },
  {
    name: "Yellow",
    color: "#F4D201",
  },
  {
    name: "Green",
    color: "#24D153",
  },
  {
    name: "Blue",
    color: "#007FED",
  },
  {
    name: "Purple",
    color: "#A955DF",
  },
  {
    name: "Grey",
    color: "#8E8D92",
  },
];

export interface IFolder {
  folderName: string;
  isOpen: boolean;
  order: number;
  tag: {
    name: string;
    color: string;
  } | null;
  pages: Record<
    string,
    {
      pageName: string;
    }
  >;
}

export interface IDataModel {
  folders: IFolder[];
  currentFolder: string | null;
  openFolder: Action<IDataModel, { id: string; state: boolean }>;
}

export const dataModel = {
  folders: {
    "1": {
      folderName: "Folder 1",
      isOpen: false,
      order: 1,
      tag: Tags[0],
      pages: {
        "1": {
          pageName: "Page 1",
        },
        "2": {
          pageName: "Page 2",
        },
        "3": {
          pageName: "Page 3",
        },
      },
    },
  },
  currentFolder: null,
  openFolder: action<IDataModel>(
    (
      state,
      payload: {
        id: string;
        state: boolean;
      }
    ) => {
      if (payload.id in state.folders) {
        state.folders = {
          ...state.folders,
          [payload.id]: {
            // @ts-ignore
            ...state.folders[payload.id],
            isOpen: payload.state,
          },
        };
        state.currentFolder = payload.state ? payload.id : null;
      }
    }
  ),

  renamePage: action<IDataModel>(
    (
      state,
      payload: {
        folderId: string;
        pageId: string;
        pageName: string;
      }
    ) => {
      state.folders = {
        ...state.folders,
        [payload.folderId]: {
          // @ts-ignore
          ...state.folders[payload.folderId],
          pages: {
            // @ts-ignore
            ...state.folders[payload.folderId].pages,
            [payload.pageId]: {
              // @ts-ignore
              ...state.folders[payload.folderId].pages[payload.pageId],
              pageName: payload.pageName,
            },
          },
        },
      };
    }
  ),

  renameFolder: action<IDataModel>(
    (state, payload: { folderId: string; folderName: string }) => {
      console.log(payload);
      state.folders = {
        ...state.folders,
        [payload.folderId]: {
          // @ts-ignore
          ...state.folders[payload.folderId],
          folderName: payload.folderName,
        },
      };
    }
  ),

  addFolder: action<IDataModel>(
    (
      state,
      payload: {
        folderName: string;
        tag: {
          name: string;
          color: string;
        } | null;
      }
    ) => {
      const id = nanoid();
      state.folders = {
        ...state.folders,
        [id]: {
          folderName: payload.folderName,
          isOpen: false,
          tag: payload.tag,
          pages: {},
        },
      };
    }
  ),

  addPage: action<IDataModel>(
    (
      state,
      payload: {
        folderId?: string;
        pageName: string;
      }
    ) => {
      if (!state.currentFolder && payload.folderId === undefined) return;

      const id = nanoid();
      let temp = { ...state.folders };
      // @ts-ignore
      temp[payload.folderId! || state.currentFolder!].pages[id] = {
        pageName: payload.pageName,
      };
      state.folders = temp;
    }
  ),

  deletePage: action<IDataModel>(
    (
      state,
      payload: {
        folderId: string;
        pageId: string;
      }
    ) => {
      let temp = { ...state.folders };
      // @ts-ignore
      delete temp[payload.folderId].pages[payload.pageId];
      state.folders = temp;
    }
  ),

  deleteFolder: action<IDataModel>((state, payload: { folderId: string }) => {
    let temp = { ...state.folders };
    // @ts-ignore
    delete temp[payload.folderId];
    state.folders = temp;
  }),
};
