import { AUTH_LOGIN, AUTH_LOGOUT, SET_USER, SET_USERS } from '../../types/auth';
import { initializeGoogleAuth } from '../../../api/googleAuth';
import {
  getUserProfile,
  getUserStats,
  setCreatureColors,
  setUserStats,
  deleteUserStats,
  postUserStats,
  postUserProfile,
  deleteUserProfile,
} from '../../creators/profile';
import { setNetworkError } from '../ui';
import { readUser, readUsers } from '../../../api/users';

export const login = (user) => {
  return async (dispatch) => {
    const { id } = user;

    try {
      await dispatch(getUserStats(id));
    } catch (response) {
      const { status: httpStatus } = response;
      if (httpStatus === 404) {
        await dispatch(postUserStats(id));
      }
    }

    // read profile
    // determine if user has a profile
    // create profile
    try {
      await dispatch(getUserProfile(id));
    } catch (response) {
      const { status: httpStatus } = response;
      if (httpStatus === 404) {
        try {
          await dispatch(postUserProfile(id));
          await dispatch(postUserProfile(id));
        } catch (error) {
          dispatch(setNetworkError(error.message));
        }
      }
    }

    dispatch(setLogin(user));
  };
};

export const setLogin = (user) => {
  return {
    type: AUTH_LOGIN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const requestSignIn = () => {
  return async () => {
    initializeGoogleAuth().then((GoogleAuth) => {
      GoogleAuth.signIn();
    });
  };
};

export const requestSignOut = () => {
  return async () => {
    initializeGoogleAuth().then((GoogleAuth) => {
      GoogleAuth.signOut();
    });
  };
};

export const requestDeleteUserStats = (user) => {
  return async (dispatch) => {
    const { id } = user;
    await dispatch(deleteUserStats(id)).then(() => {
      dispatch(requestSignOut());
    });
  };
};

export const requestDeleteUserProfile = (user) => {
  return async (dispatch) => {
    const { id } = user;
    await dispatch(deleteUserProfile(id)).then(() => {
      dispatch(setUserStats({}));
      dispatch(setCreatureColors({}));
      dispatch(requestSignOut());
    });
  };
};

// should be in users slice
export const getUsers = (force = false) => {
  return async (dispatch, getState) => {
    const state = getState();
    const cached = state.users.cached;

    if (cached === true && force === false) {
      return;
    }
    try {
      const users = await readUsers();
      dispatch(setUsers(users));
    } catch (error) {
      console.log(error);
    }
  };
};

// should be in users slice
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

// should be in users slice
export const getUser = (userId, force = false) => {
  return async (dispatch, getState) => {
    const state = getState();
    const user = state.users.entities[userId];

    if (user !== undefined && force === false) {
      return;
    }

    try {
      const stats = await readUser(userId);
      dispatch(
        setUser({
          id: userId,
          stats,
        }),
      );
    } catch (response) {
      console.log(response);
    }
  };
};

// should be in users slice
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
