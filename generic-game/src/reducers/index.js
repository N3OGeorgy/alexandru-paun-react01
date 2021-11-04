import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});

export default reducers;
