// eslint-disable-next-line no-unused-vars
import { createStore, action, computed, persist, debug } from "easy-peasy";
import getRandomImage from "../Assets/Img/unsplashImages";
import { lastModified } from "../Utils/lastModified";
import { sortByLastModified } from "../Utils/sortByLastModified";
// eslint-disable-next-line no-unused-vars
import { defaultBoards, themes } from "./defaultValues";
import shortid from "shortid";

// let localNotesList = defaultNotes;
// let localBoardsList = defaultBoards;

// TODO: add a backup state to reset to if reloaded without saving

const Store = createStore(
  persist({
    // global states and actions
    userState: null,
    currentOption: "boards",
    setCurrentOption: action((state, payload) => {
      state.currentOption = payload;
    }),

    setUserState: action((state, payload) => {
      state.userState = payload;
    }),

    // Boards related states and actions
    boards: [],
    selectedBoard: null,
    boardCount: computed((state) => state.boards.length),

    addBoard: action((state, payload) => {
      const newBoardId = new Date().getTime();

      // temp item
      // const panelItem = {
      //   content: "tempItem",
      //   id: shortid.generate(),
      //   position: payload.position ? payload.position : 0,
      // };
      // const boardPanelsItem = {
      //   id: shortid.generate(),
      //   title: "",
      //   position: payload.position ? payload.position : 0,
      //   panelItems: [panelItem],
      // };

      const presets = {
        BasicKanban: [
          {
            id: shortid.generate(),
            title: "To Do",
            position: payload.position ? payload.position : 0,
            panelItems: [],
          },
          {
            id: shortid.generate(),
            title: "In Progress",
            position: payload.position ? payload.position : 0,
            panelItems: [],
          },
          {
            id: shortid.generate(),
            title: "Done",
            position: payload.position ? payload.position : 0,
            panelItems: [],
          },
        ],
        Empty: [],
      };

      const image = getRandomImage(
        state.boards.map(
          (board) =>
            board.backgroundImage.backgroundImage.split(
              "https://images.unsplash.com/photo-"
            )[1]
        )
      );

      const newBoard = {
        id: payload.id ? payload.id : newBoardId,
        title: payload.title ? payload.title : "Untitled",
        uid: payload.uid ? payload.uid : state.userState.id,
        isStarred: false,
        boardPanels: payload.preset ? presets[payload.preset] : [],
        backgroundImage: image,
        lastModified: lastModified(),
      };
      state.boards.push(newBoard);

      // Temp comment. Uncomment when all boards have lastModified
      // state.boards = sortByLastModified(state.boards);
      // state.selectedBoard = newBoard;
    }),

    deleteBoard: action((state, payload) => {
      state.boards = state.boards.filter((board) => board.id !== payload);
    }),

    setSelectedBoard: action((state, payload) => {
      const id = payload;
      const board = state.boards.find((board) => board.id === id);
      state.selectedBoard = board;
    }),

    setSelectedBoardData: action((state, payload) => {
      const { id, data } = payload;
      state.boards = state.boards.map((board) => {
        if (board.id === id) {
          return data;
        }
        return board;
      });
      state.selectedBoard = data;
    }),

    setSelectedBoardTitle: action((state, payload) => {
      const title = payload.title;
      const id = payload.id;
      const board = state.boards.find((board) => board.id === id);
      board.title = title;
      board.lastModified = lastModified();
      const index = state.boards.findIndex((board) => board.id === id);
      state.boards[index] = board;
      state.selectedBoard = board;
    }),

    setBoardPanelTitle: action((state, payload) => {
      const title = payload.title;
      const id = payload.id;
      const panel = state.selectedBoard.boardPanels.find(
        (panel) => panel.id === id
      );
      panel.title = title;
      panel.lastModified = lastModified();
      const index = state.selectedBoard.boardPanels.findIndex(
        (panel) => panel.id === id
      );
      const tempBoard = state.selectedBoard;
      tempBoard.boardPanels[index] = panel;
      state.selectedBoard = tempBoard;

      state.boards = state.boards.map((board) => {
        if (board.id === state.selectedBoard.id) {
          board = tempBoard;
        }
        return board;
      });
    }),

    addPanel: action((state, payload) => {
      const newPanel = {
        id: shortid.generate(),
        title: "Untitled",
        position: payload.position ? payload.position : 0,
        panelItems: [],
      };

      const tempBoard = state.selectedBoard;
      tempBoard.boardPanels.push(newPanel);

      state.selectedBoard = tempBoard;
      state.boards = state.boards.map((board) => {
        if (board.id === state.selectedBoard.id) {
          return tempBoard;
        }
        return board;
      });
    }),

    addPanelItem: action((state, payload) => {
      const panelId = payload.id;

      const newPanelItem = {
        content: "tempItem",
        id: shortid.generate(),
        lastModified: lastModified(),
        position: payload.position ? payload.position : 0,
      };

      // select board based on panelId
      const board = state.boards.find((board) => {
        return board.boardPanels.find((panel) => panel.id === panelId);
      });

      // add new panel item to selected board panel by panelId
      const panel = board.boardPanels.find((panel) => panel.id === panelId);
      panel.panelItems.push(newPanelItem);

      state.selectedBoard = board;

      state.boards = state.boards.map((board) => {
        if (board.id === state.selectedBoard.id) {
          return state.selectedBoard;
        }
        return board;
      });
    }),
    removePanelItem: action((state, payload) => {
      const { cardId, panelId } = payload;

      const board = state.boards.find((board) => {
        return board.boardPanels.find((panel) => panel.id === panelId);
      });

      const panel = board.boardPanels.find((panel) => panel.id === panelId);
      const index = panel.panelItems.findIndex(
        (panelItem) => panelItem.id === cardId
      );
      panel.panelItems.splice(index, 1);

      state.selectedBoard = board;
    }),

    removePanel: action((state, payload) => {
      const panelId = payload;

      const board = state.boards.find((board) => {
        return board.boardPanels.find((panel) => panel.id === panelId);
      });

      const index = board.boardPanels.findIndex(
        (panel) => panel.id === panelId
      );
      board.boardPanels.splice(index, 1);

      state.selectedBoard = board;
    }),

    setBoardPanelItemOrder: action((state, payload) => {
      const boardPanels = payload;
      state.selectedBoard.boardPanels = boardPanels;
      state.boards = state.boards.map((board) => {
        if (board.id === state.selectedBoard.id) {
          return state.selectedBoard;
        }
        return board;
      });
    }),

    setBoardStarState: action((state, payload) => {
      const { id, starState } = payload;
      const newBoard = state.boards.find((board) => board.id === id);

      newBoard.isStarred = starState;
      state.boards = state.boards.map((board) => {
        if (board.id === id) {
          return newBoard;
        }
        return board;
      });

      state.selectedBoard = newBoard;
    }),

    /* #region Notes */
    // Notes related states and actions
    notes: [],
    selectedNote: null,
    noteCount: computed((state) => {
      if (state.notes.length === 0) {
        state.selectedNote = null;
      }
      return state.notes.length;
    }),

    setNotes: action((state, notes) => {
      state.notes = notes;

      if (state.selectedNote === null || state.selectedNote === undefined) {
        state.selectedNote = sortByLastModified(notes)[0];
      }
    }),

    setSelectedNoteColor: action((state, payload) => {
      const id = payload.id;
      const color = payload.theme;
      const note = state.notes.find((note) => note.id === id);
      note.theme = color;
      note.isChanged = true;
      note.lastModified = lastModified();

      state.notes = state.notes.map((note) => {
        if (note.id === id) {
          return note;
        }
        return note;
      });
      // set selected note
      state.selectedNote = state.notes.find((note) => note.id === id);
      // update in state.notes
      state.notes = state.notes.map((note) => {
        if (note.id === id) {
          return note;
        }
        return note;
      });
      state.notes = sortByLastModified(state.notes);
    }),

    setSelectedNote: action((state, payload) => {
      state.notes = state.notes.filter((note) => {
        if (note.content === "" && note.id !== payload) {
          return false;
        }
        return true;
      });

      if (state.notes.find((note) => note.id === payload)) {
        state.selectedNote = state.notes.find((note) => note.id === payload);
      } else {
        state.selectedNote = sortByLastModified(state.notes)[0];
      }
    }),

    setSelectedNoteTitle: action((state, payload) => {
      const title = payload.title;
      const id = payload.id;
      const note = state.notes.find((note) => note.id === id);
      // console.log(debug(payload));
      note.title = title;
      note.isChanged = true;
      note.lastModified = lastModified();

      state.notes = state.notes.map((note) => {
        if (note.id === id) {
          return note;
        }
        return note;
      });
      state.selectedNote = state.notes.find((note) => note.id === id);
    }),

    setSelectedNoteContent: action((state, payload) => {
      const note = state.notes.find((note) => note.id === payload.id);
      note.content = payload.content;
      note.isChanged = true;
      note.lastModified = lastModified();
      note.sanitizedContent = payload.sanitizedContent;

      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return note;
        }
        return note;
      });

      state.selectedNote = state.notes.find((note) => note.id === payload.id);
      state.notes = sortByLastModified(state.notes);
    }),

    deleteNote: action((state, payload) => {
      const payloadNoteIndex = state.notes.findIndex(
        (note) => note.id === payload
      );
      state.notes = state.notes.filter((note) => note.id !== payload);
      const notesLength = state.notes.length;
      if (notesLength !== 0) {
        if (payloadNoteIndex === 0) {
          state.selectedNote = state.notes[0];
        } else if (payloadNoteIndex === notesLength) {
          state.selectedNote = state.notes[notesLength - 1];
        } else if (payloadNoteIndex > 0 && payloadNoteIndex < notesLength) {
          state.selectedNote = state.notes[payloadNoteIndex - 1];
        }
      }
    }),

    addNote: action((state, payload) => {
      const newNote = {
        id: payload.id ? payload.id : new Date().getTime(),
        user_id: payload.uid,
        title: "Untitled",
        content: "",
        sanitizedContent: "",
        isChanged: true,
        theme: themes.yellow,
        lastModified: lastModified(),
      };
      state.notes.push(newNote);
      state.notes = sortByLastModified(state.notes);
      state.selectedNote = newNote;
    }),

    /*#endregion*/
  })
);

export { Store };
