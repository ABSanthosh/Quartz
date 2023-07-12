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
  id: string;
  isOpen: boolean;
  tag: {
    name: string;
    color: string;
  } | null;
  pages: {
    id: string;
    pageName: string;
  }[];
}

export interface IDataModel {
  folders: IFolder[];
  openFolder: Action<IDataModel, { id: string; state: boolean }>;
}

export const dataModel = {
  folders: [
    {
      folderName: "Folder 1",
      id: "1",
      isOpen: false,
      tag: Tags[0],
      pages: [
        {
          pageName: "Page 1",
          id: "1",
        },
        {
          pageName: "Page 2",
          id: "2",
        },
        {
          pageName: "Page 3",
          id: "3",
        },
        ...Array(50)
          .fill("")
          .map((_, i) => ({
            pageName: `Page ${i + 4}`,
            id: `${i + 4}`,
          })),
      ],
    },
    {
      folderName: "Folder 2",
      id: "2",
      isOpen: false,
      tag: Tags[0],
      pages: [
        {
          pageName: "Page 1",
          id: "1",
        },
        {
          pageName: "Page 2",
          id: "2",
        },
        {
          pageName: "Page 3",
          id: "3",
        },
        ...Array(50)
          .fill("")
          .map((_, i) => ({
            pageName: `Page ${i + 4}`,
            id: `${i + 4}`,
          })),
      ],
    },
  ],
  openFolder: action<IDataModel>(
    (
      state,
      payload: {
        id: string;
        state: boolean;
      }
    ) => {
      state.folders = state.folders.map((folder) => {
        if (folder.id === payload.id) {
          return {
            ...folder,
            isOpen: payload.state,
          };
        }

        return folder;
      });
    }
  ),
};
