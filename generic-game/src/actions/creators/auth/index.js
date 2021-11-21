import { AUTH_LOGIN, AUTH_LOGOUT } from '../../types/auth';
import { initializeGoogleAuth } from '../../../api/googleAuth';
import {
  getUserProfile,
  getUserStats,
  postUserStats,
  postUserProfile,
} from '../../creators/profile';
import { setNetworkError } from '../ui';

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
