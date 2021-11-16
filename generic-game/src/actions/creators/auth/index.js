import { AUTH_LOGIN, AUTH_LOGOUT } from '../../types/auth';
import { initializeGoogleAuth } from '../../../api/googleAuth';
import { getUserStats, postUserStats } from '../../types/profile';

export const login = (user) => {
  return async (dispatch) => {
    const { id } = user;

    try {
      await dispatch(getUserStats(id));
    } catch (error) {
      await dispatch(postUserStats(id));
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
