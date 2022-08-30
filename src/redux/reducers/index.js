import {combineReducers} from 'redux';
import {authentication} from './authReducer';
import {registration} from './registerReducer';
import {users} from './usersReducer';
import {alert} from './alertReducer';
import {posts} from './postReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  posts
});

export default rootReducer;