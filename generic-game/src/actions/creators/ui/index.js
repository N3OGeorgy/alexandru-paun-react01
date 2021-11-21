import {
  CLICKER_CLICK,
  CLICKER_DECREMENT,
  SET_NETWORK_ERROR,
} from '../../types/ui';

export const clickClicker = (payload = 1) => {
  return {
    type: CLICKER_CLICK,
    payload: payload,
  };
};

export const decrementClicker = (payload = 1) => {
  return {
    type: CLICKER_DECREMENT,
    payload: payload,
  };
};

export const setNetworkError = (payload = 'Unknown Network Error') => {
  return {
    type: SET_NETWORK_ERROR,
    payload: payload,
  };
};
