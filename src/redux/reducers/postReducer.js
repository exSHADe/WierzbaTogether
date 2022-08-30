import {postTypes} from '../types'


export function posts(state = {}, action) {
    switch (action.type) {
      case postTypes.GETALL_REQUEST:
        {
          if(state.items )return {...state}
          else return {loading: true}
        };
      case postTypes.GETALL_SUCCESS:
          return {
            items: action.items.posts,
            next: action.items.next
          };
      case postTypes.GETALL_FAILURE:
          return { 
            error: action.error
          };
      case postTypes.SET_REQUEST:
          return{
            ...state
          }
      case postTypes.SET_SUCCESS:
        return{
            items:state.items.map(post=>
              post.id === action.react.id 
              ? {...action.react, key:post.key}
              : post
              )
          }
      case postTypes.SET_FAILURE:
          return{
            error: action.error
          } 
      case postTypes.DELETE_REQUEST:
          return{
            ...state,
            items:state.items.map(post=>
              post.id === action.id
              ? {...post, deleting:true}
              : post
              )
          }
      case postTypes.DELETE_SUCCESS:
        return{
          items: state.items.filter(post => post.id !== action.id)
        }
      case postTypes.DELETE_FAILURE:
        return{
          ...state,
          items: state.items.map(post => {
            if (post.id === action.id) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...postCopy } = post;
              // return copy of user with 'deleteError:[error]' property
              return { ...postCopy, deleteError: action.error };
            }})
        }
      default:
        return state
    }
  }
