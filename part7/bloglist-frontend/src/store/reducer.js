import { combineReducers } from 'redux';
import notificationReducer from '../reducers/notificationReducer';
import blogReducer from '../reducers/blogReducer';

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs:blogReducer,
});

export default rootReducer;
