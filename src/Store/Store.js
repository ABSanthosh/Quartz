import { createStore, action } from "easy-peasy";
import { defaultBoards, defaultNotes } from "./defaultValues";
const Store = createStore({
  notes: defaultNotes,
  boards: defaultBoards,
  currentOption: "Notes",
  userState: null,

  selectedNote: defaultNotes[0],

  setSelectedNote: action((state, payload) => {
    state.selectedNote = defaultNotes[payload];
  }),
  setCurrentOption: action((state, payload) => {
    state.currentOption = payload;
  }),
  setUserState: action((state, payload) => {
    state.userState = payload;
  }),
});

export { Store };
