import { createStore, action } from "easy-peasy";
import { defaultBoards, defaultNotes, themes } from "./defaultValues";

let localNotesList = defaultNotes;

const Store = createStore({
  notes: localNotesList,
  boards: defaultBoards,
  currentOption: "Notes",
  userState: null,

  selectedNote: localNotesList[0],

  setSelectedNoteColor: action((state, payload) => {
    const id = payload.id;
    const color = payload.theme;
    const note = state.notes.find((note) => note.id === id);
    note.theme = color;

    state.notes = state.notes.map((note) => {
      if (note.id === id) {
        return note;
      }
      return note;
    });
    // set selected note
    state.selectedNote = state.notes.find((note) => note.id === id);
  }),

  setSelectedNote: action((state, payload) => {
    state.selectedNote = state.notes.find((note) => note.id === payload);
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
