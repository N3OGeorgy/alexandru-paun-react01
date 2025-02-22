import {
  createProfile,
  createUser,
  deleteUser,
  readProfile,
  readUser,
  updateProfile,
  deleteProfile,
  updateGameWon,
  updateGameLost,
} from '../../../api/users';
import {
  PROFILE_SET_COLOR,
  PROFILE_SET_COLORS,
  PROFILE_SET_STATS,
} from '../../types/profile';

// getUserStats
export const getUserStats = (userId) => {
  return async (dispatch) => {
    try {
      const stats = await readUser(userId);

      dispatch(setUserStats(stats));

      return stats;
    } catch (error) {
      const { response: axiosResponse } = error;
      return Promise.reject(axiosResponse);
    }
  };
};

export const setUserStats = (stats) => {
  return {
    type: PROFILE_SET_STATS,
    payload: stats,
  };
};

export const postUserStats = (userId) => {
  return async () => {
    await createUser(userId);
  };
};

export const deleteUserStats = (userId) => {
  return async () => {
    await deleteUser(userId);
  };
};

export const getUserProfile = (userId) => {
  return async (dispatch) => {
    let creatureColors = {};

    try {
      creatureColors = await readProfile(userId);

      dispatch(setCreatureColors(creatureColors));

      return creatureColors;
    } catch (error) {
      const response = error.response;
      return Promise.reject(response);
    }
  };
};

export const postUserProfile = (userId) => {
  return async (_, getState) => {
    const { profile } = getState();

    await createProfile(userId, profile.creature);
  };
};

export const setCreatureColor = (targetProperty, color) => {
  return {
    type: PROFILE_SET_COLOR,
    payload: {
      targetProperty,
      color,
    },
  };
};

export const patchUserProfile = (userId, colors) => {
  return async () => {
    await updateProfile(userId, colors);
  };
};

export const setCreatureColors = (creatureColors) => {
  return {
    type: PROFILE_SET_COLORS,
    payload: creatureColors,
  };
};

export const deleteUserProfile = (userId) => {
  return async () => {
    await deleteProfile(userId);
  };
};

export const patchGameLost = () => {
  return async (dispatch, getState) => {
    const { auth, profile } = getState();
    const { id: userId } = auth.user;
    try {
      const userStats = await updateGameLost(userId, profile.stats);
      dispatch(setUserStats(userStats));
    } catch (error) {
      const response = error.response;
      return Promise.reject(response);
      // if any other errors are encountered
      // notify user?
    }
  };
};

export const patchGameWon = () => {
  return async (dispatch, getState) => {
    const { auth, profile } = getState();
    const { id: userId } = auth.user;
    try {
      const userStats = await updateGameWon(userId, profile.stats);
      dispatch(setUserStats(userStats));
    } catch (error) {
      return Promise.reject(error.response);
      // if any other errors are encountered
      // notify user?
    }
  };
};
