import { act } from 'react-dom/test-utils';
import {userTypes} from '../types';

export function users(state = {}, action) {
  switch (action.type) {
    case userTypes.GETALL_REQUEST:
      return {
        loading: true
      };
    case userTypes.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userTypes.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userTypes.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userTypes.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userTypes.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }
          return user;
        })
      };
    case userTypes.MODIFYALL_REQUEST:
      return {
        state
        // items: state.items.map(user =>
        //   user.id === action.id
        //     ? { ...user, modified: true }
        //     : user
        // )
      };
    case userTypes.MODIFYALL_SUCCESS:
      return{
        items : state.items.map(user =>
          user.id === action.id ? {user:Object.assign(user,action.user)} : user
        )
      }
    case userTypes.MODIFYALL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    default:
      return state
  }
}