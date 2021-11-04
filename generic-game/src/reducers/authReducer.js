import { AUTH_LOGIN } from '../actions/types/auth';

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
    default:
      return state;
  }

  return state;
};

export default authReducer;
