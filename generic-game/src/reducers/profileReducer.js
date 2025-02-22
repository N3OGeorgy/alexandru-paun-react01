import {
  PROFILE_SET_COLOR,
  PROFILE_SET_COLORS,
  PROFILE_SET_STATS,
} from '../actions/types/profile';

const initialState = {
  stats: {
    gamesWon: 0,
    gamesLost: 0,
    gamesPlayed: 0,
  },
  creature: {
    mainColor: '#ff5533',
    secondaryColor: '#ff7bad',
    eyeColor: '#000000',
  },
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PROFILE_SET_STATS:
      if (
        Object.keys(payload).length === 0 &&
        Object.getPrototypeOf(payload) === Object.prototype
      ) {
        payload = initialState.stats;
      }

      return {
        ...state,
        stats: payload,
      };
    case PROFILE_SET_COLOR:
      return {
        ...state,
        creature: {
          ...state.creature,
          [payload.targetProperty]: payload.color,
        },
      };
    case PROFILE_SET_COLORS:
      if (
        Object.keys(payload).length === 0 &&
        Object.getPrototypeOf(payload) === Object.prototype
      ) {
        payload = initialState.creature;
      }

      return {
        ...state,
        creature: payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
