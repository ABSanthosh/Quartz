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
    content:
      "Try making so<b>me </b><i><b>of this te</b>xt bold or</i><div><ul><li><i>t<strike>his is <b>bullshit</b></strike></i></li></ul></div><div><i>even italic</i></div>",
    sanitizedContent:
      "Try making some of this text bold or\nthis is bullshit\neven italic",
    theme: themes.yellow,
  },
  {
    id: 2,
    title: "Note 2",
    lastModified: "5.12 PM",
    content:
      'Try making so<b>me </b><i><b>of this te</b>xt bold or</i><div><ul><li>t<strike style="">his <i>is </i><b style="font-style: italic;">bullshit</b></strike></li></ul></div><div><i>even italic</i></div><div><i><br></i></div><div><i>df</i></div><div><i>sfg</i></div><div><i>df</i></div><div><i>ga</i>x</div><div>fdz</div><div>xdf</div><div>s</div><div>h</div><div>rtsr</div><div>j</div><div><br></div><div>js</div><div>tj</div><div>styjy</div><div>st</div><div>j</div><div>st</div><div>tj</div><div>s</div><div>sj</div><div>rt</div><div>js</div><div>rtj</div><div>s</div><div>j</div><div>strj</div><div>s</div><div>rtj</div><div>stj</div><div><br></div>',
    sanitizedContent: "This is note 2",
    theme: themes.gray,
  },
  {
    id: 3,
    title: "Note 3",
    lastModified: "5.12 PM",
    content: "This is note 3",
    sanitizedContent: "This is note 2",
    theme: themes.mint,
  },
  {
    id: 4,
    title: "Note 4",
    lastModified: "5.12 PM",
    content: "This is note 4",
    sanitizedContent: "This is note 2",
    theme: themes.pink,
  },
  {
    id: 5,
    title: "Note 5",
    lastModified: "5.12 PM",
    content: "This is note 5",
    sanitizedContent: "This is note 2",
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

export { defaultNotes, defaultBoards, themes };
