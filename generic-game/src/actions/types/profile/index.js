import { createUser, readUser } from '../../../api/users';

// getUserStats
export const getUserStats = (userId) => {
  return async () => {
    try {
      const stats = await readUser(userId);
      // write stats to state
      return stats;
    } catch (error) {
      const { axiosResponse } = error;
      return Promise.reject(axiosResponse);
    }
  };
};

// postUserStats
export const postUserStats = (userId) => {
  return async () => {
    await createUser(userId);
  };
};
