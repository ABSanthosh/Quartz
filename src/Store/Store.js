import { createStore, action, computed } from "easy-peasy";
import { defaultBoards, themes } from "./defaultValues";

let localNotesList = [];
let localBoardsList = defaultBoards;

const Store = createStore({
  notes: localNotesList,
  boards: localBoardsList,
  currentOption: "Notes",
  userState: null,
  user_id: null,

  selectedNote: localNotesList[0],
  noteCount: computed(({ notes }) => notes.length),
  boardsCount: computed(({ boards }) => boards.length),

  setNotes: action((state, notes) => {
    state.notes = notes;
    state.selectedNote = notes[0];
  }),

  setSelectedNoteColor: action((state, payload) => {
    const id = payload.id;
    const color = payload.theme;
    const note = state.notes.find((note) => note.id === id);
    note.theme = color;
    note.isChanged = true;

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
  }),

  setSelectedNote: action((state, payload) => {
    state.selectedNote = state.notes.find((note) => note.id === payload);
  }),

  updateSelectedNote: action((state, payload) => {
    const note = state.notes.find((note) => note.id === payload.id);
    note.content = payload.content;
    note.sanitizedContent = payload.sanitizedContent;
    state.selectedNote = note;
    note.isChanged = true;
    state.notes = state.notes.map((oldNote) => {
      if (oldNote.id === payload.id) {
        return note;
      }
      return oldNote;
    });
  }),

  setLastModified: action((state, payload) => {
    const id = payload.id;
    const lastModified = payload.lastModified;
    const note = state.notes.find((note) => note.id === id);
    note.lastModified = lastModified;
    note.isChanged = true;

    state.notes = state.notes.map((note) => {
      if (note.id === id) {
        return note;
      }
      return note;
    });
    // set selected note
    state.selectedNote = state.notes.find((note) => note.id === id);
  }),

  setSelectedNoteContent: action((state, payload) => {
    const id = payload.id;
    const content = payload.content;
    const sanitizedContent = payload.sanitizedContent;
    const note = state.notes.find((note) => note.id === id);
    note.content = content;
    note.isChanged = true;
    note.sanitizedContent = sanitizedContent;

    state.notes = state.notes.map((note) => {
      if (note.id === id) {
        return note;
      }
      return note;
    });
    // set selected note
    state.selectedNote = state.notes.find((note) => note.id === id);
  }),

  setCurrentOption: action((state, payload) => {
    state.currentOption = payload;
  }),

  setUserState: action((state, payload) => {
    state.userState = payload;
    state.user_id = payload.id;
  }),

  deleteNote: action((state, payload) => {
    const payloadNoteIndex = state.notes.findIndex(
      (note) => note.id === payload
    );
    state.notes = state.notes.filter((note) => note.id !== payload);
    const notesLength = state.notes.length;
    console.log(payloadNoteIndex);
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

  addNote: action((state) => {
    var today = new Date();
    const newNote = {
      id: new Date().getTime(),
      title: "New note",
      content: "New note, this is",
      theme: themes.yellow,
      lastModified: today.getHours() + ":" + today.getMinutes(),
    };
    state.notes.push(newNote);
    state.selectedNote = newNote;
  }),
});

export { Store };
