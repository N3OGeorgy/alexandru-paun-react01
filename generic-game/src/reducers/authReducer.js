import { AUTH_LOGIN, AUTH_LOGOUT } from '../actions/types/auth';

const initialState = {
  user: null,
  authenticated: false,
  established: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        authenticated: true,
        established: true,
        user: payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        authenticated: false,
        established: true,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
