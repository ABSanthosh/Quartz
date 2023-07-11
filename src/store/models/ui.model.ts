import { Action, action } from "easy-peasy";

export interface IUIModel {
  isNavOpen: boolean;
  toggleNav: Action<IUIModel, void>;
}

export const uiModel = {
  isNavOpen: true,

  toggleNav: action<IUIModel>((state) => {
    state.isNavOpen = !state.isNavOpen;
  }),
};
