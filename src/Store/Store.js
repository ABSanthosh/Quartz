import { createStore, action } from "easy-peasy";

const Store = createStore({
  userState: null,
  setUserState: action((state, payload) => {
    state.userState = payload;
  }),
});

export { Store };
