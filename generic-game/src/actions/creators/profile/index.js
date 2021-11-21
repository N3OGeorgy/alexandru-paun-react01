import {
  createProfile,
  createUser,
  readProfile,
  readUser,
} from '../../../api/users';
import { PROFILE_SET_STATS } from '../../types/profile';

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

export const getUserProfile = (userId) => {
  return async () => {
    let creatureColors = {};

    try {
      creatureColors = await readProfile(userId);
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
