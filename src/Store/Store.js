import { createStore, action, computed } from "easy-peasy";
import { lastModified } from "../Utils/lastModified";
import { sortByLastModified } from "../Utils/sortByLastModified";
import { defaultBoards, themes } from "./defaultValues";

// let localNotesList = defaultNotes;
let localBoardsList = defaultBoards;

const Store = createStore({
  notes: [],
  boards: localBoardsList,
  currentOption: "boards",
  userState: null,

  selectedNote: null,
  noteCount: computed(({ notes }) => notes.length),
  boardsCount: computed(({ boards }) => boards.length),

  setNotes: action((state, notes) => {
    state.notes = notes;
    state.selectedNote = sortByLastModified(notes)[0];
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
    state.selectedNote = state.notes.find((note) => note.id === payload);
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

  setCurrentOption: action((state, payload) => {
    state.currentOption = payload;
  }),

  setUserState: action((state, payload) => {
    state.userState = payload;
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

  addNote: action((state, uid) => {
    const newNote = {
      id: new Date().getTime(),
      user_id: uid,
      title: "New note",
      content: "New note, this is",
      isChanged: true,
      theme: themes.yellow,
      lastModified: lastModified(),
    };
    state.notes.push(newNote);
    state.notes = sortByLastModified(state.notes);
    state.selectedNote = newNote;
  }),
});

export { Store };
