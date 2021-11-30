import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import gameReducer from './gameReducer';

const reducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
  game: gameReducer,
});

export default reducer;
