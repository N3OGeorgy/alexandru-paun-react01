import { createContext } from 'react';

export const AppContest = createContext();

export const appState = {
  currentScreen: 'home',
  selected: null,
};

export const appStateReducer = (appState, { type, payload }) => {
  if (type === 'setScreen') {
    // payloads comits to being something like 'home', 'products' etc.
    return {
      ...appState,
      currentScreen: payload,
    };
  }

  if (type === 'setSelected') {
    return {
      ...appState,
      selected: payload,
    };
  }

  return appState;
};
