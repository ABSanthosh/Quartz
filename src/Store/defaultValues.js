const themes = {
  yellow: { primary: "#fff6cb", secondary: "#ffee92" },
  mint: { primary: "#e7f6e4", secondary: "#d1ebcb" },
  pink: { primary: "#ffe3f1", secondary: "#ffc5e1" },
  purple: { primary: "#f2e5ff", secondary: "#e2d0f5" },
  blue: { primary: "#e7f3ff", secondary: "#cce7ff" },
  gray: { primary: "#edebe9", secondary: "#dddad8" },
};

const defaultNotes = [
  {
    id: 1,
    title: "Note 1",
    lastModified: "5.12 PM",
    content: "This is note 1",
    theme: themes.yellow,
  },
  {
    id: 2,
    title: "Note 2",
    lastModified: "5.12 PM",
    content: "This is note 2",
    theme: themes.gray,
  },
  {
    id: 3,
    title: "Note 3",
    lastModified: "5.12 PM",
    content: "This is note 3",
    theme: themes.mint,
  },
  {
    id: 4,
    title: "Note 4",
    lastModified: "5.12 PM",
    content: "This is note 4",
    theme: themes.pink,
  },
  {
    id: 5,
    title: "Note 5",
    lastModified: "5.12 PM",
    content: "This is note 5",
    theme: themes.purple,
  },
];

const defaultBoards = [
  {
    id: 1,
    title: "Board 1",
    lists: [
      {
        id: 1,
        title: "List 1",
        notes: [1, 2, 3],
      },
    ],
  },
  {
    id: 2,
    title: "Board 2",
    lists: [
      {
        id: 1,
        title: "List 1",
        notes: [1, 2, 3],
      },
    ],
  },
  {
    id: 3,
    title: "Board 3",
    lists: [
      {
        id: 1,
        title: "List 1",
        notes: [1, 2, 3],
      },
    ],
  },
  {
    id: 4,
    title: "Board 4",
    lists: [
      {
        id: 1,
        title: "List 1",
        notes: [1, 2, 3],
      },
    ],
  },
  {
    id: 1,
    title: "Board 1",
    lists: [
      {
        id: 1,
        title: "List 1",
        notes: [1, 2, 3],
      },
    ],
  },
  {
    id: 2,
    title: "Board 2",
    lists: [
      {
        id: 1,
        title: "List 1",
        notes: [1, 2, 3],
      },
    ],
  },
  {
    id: 3,
    title: "Board 3",
    lists: [
      {
        id: 1,
        title: "List 1",
        notes: [1, 2, 3],
      },
    ],
  },
  {
    id: 4,
    title: "Board 4",
    lists: [
      {
        id: 1,
        title: "List 1",
        notes: [1, 2, 3],
      },
    ],
  },
];

export { defaultNotes, defaultBoards,themes };
