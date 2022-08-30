import {userTypes} from '../types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userTypes.LOGIN_FAILURE:
      return {};
    case userTypes.LOGOUT:
      return {};
    case userTypes.MODIFY_REQUEST:
      return{
        ...state,
        copy:action.user
      }
    case userTypes.MODIFY_SUCCESS:
      return{
        loggedIn: true,
        user: Object.assign(user,action.user)
      }
    case userTypes.MODIFY_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    default:
      return state
  }
}