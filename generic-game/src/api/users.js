import axios from 'axios';

const emptyStats = {
  gamesWon: 0,
  gamesLost: 0,
  gamesPlayed: 0,
};

const usersApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

export const createUser = async (userId) => {
  const payload = {
    id: userId,
    stats: emptyStats,
  };

  return await usersApi.post('/users', payload);
};

export const readUser = async (userId) => {
  const endpoint = `/users/${userId}`;

  const { data } = await usersApi.get(endpoint);

  if (data.stats) {
    return data.stats;
  }

  return undefined;
};

export const deleteUser = async (userId) => {
  const endpoint = `/users/${userId}`;

  // const delay = (time) => {
  //   return new Promise((resolve) => setTimeout(resolve, time));
  // };

  // return await delay(3000).then(() => {
  //   usersApi.delete(endpoint);
  // });

  return await usersApi.delete(endpoint);
};

// createProfile
export const createProfile = async (userId, colors) => {
  const payload = {
    id: userId,
    creature: colors,
  };

  return await usersApi.post(`/profiles/`, payload);
};

export const readProfile = async (userId) => {
  const { data } = await usersApi.get(`/profiles/${userId}`);

  // return data?.creature;
  if (data.creature) {
    return data.creature;
  }
  return undefined;
};

export const updateProfile = async (userId, colors) => {
  const payload = {
    creature: colors,
  };

  return await usersApi.patch(`/profiles/${userId}`, payload);
};

export const deleteProfile = async (userId) => {
  const endpoint = `/profiles/${userId}`;

  return await usersApi.delete(endpoint);
};

export const updateGameLost = async (userId, userStats) => {
  const payload = {
    stats: {
      ...userStats,
      gamesLost: ++userStats.gamesLost,
      gamesPlayed: ++userStats.gamesPlayed,
    },
  };

  const { data } = await usersApi.patch(`/users/${userId}`, payload);
  if (data.stats) {
    return data.stats;
  }
  return undefined;
};

export const updateGameWon = async (userId, userStats) => {
  const payload = {
    stats: {
      ...userStats,
      gamesLost: --userStats.gamesLost,
      gamesWon: ++userStats.gamesWon,
    },
  };

  const { data } = await usersApi.patch(`/users/${userId}`, payload);
  if (data.stats) {
    return data.stats;
  }
  return undefined;
};

export const readUsers = async () => {
  try {
    const { data } = await usersApi.get(`/users/`);

    return data;
  } catch (response) {
    return response;
  }
};

export default usersApi;
