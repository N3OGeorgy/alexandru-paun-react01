import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import gameReducer from './gameReducer';
import usersReducer from './usersReducer';

const reducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
  game: gameReducer,
  users: usersReducer,
});

export default reducer;
