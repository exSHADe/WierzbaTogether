import {postTypes} from '../types';
import {postService} from '../../App/services';
import {alertActions} from '.';

export const postActions = {
    edit,
    getPosts,
    setReact,
    delete: _delete
};
function edit(post){
    return dispatch => {
        dispatch(request(post));

        postService.edit(post)
        .then( 
            item => dispatch(success(item)),
            error => dispatch(failure(error.toString()))
        )
    }   
    function request(post) { return { type: postTypes.MENAGE_REQUEST, post } }
    function success(item) { return { type: postTypes.MENAGE_SUCCESS, item } }
    function failure(error) { return { type: postTypes.MENAGE_FAILURE, error } }
}
function getPosts(id,page) {
    return dispatch => {
        dispatch(request(id,page)); 

        postService.getAllPost(id,page)
            .then(
                items => {dispatch(success(items));},
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id,page) { return { type: postTypes.GETALL_REQUEST, id,page } }
    function success(items) { return { type: postTypes.GETALL_SUCCESS, items } }
    function failure(error) { return { type: postTypes.GETALL_FAILURE, error } }
}
function setReact(id,react) {
    return dispatch => {
        dispatch(request(id,react)); 
        
        postService.set(id,react).then(
                    react => dispatch(success(react)),
                    error => {dispatch(failure(error.toString()))
                        console.log(error);
                        dispatch(alertActions.error(error.toString()));
                        setTimeout(() => dispatch(alertActions.clear()), 1000);
                    }
                );

    };

    function request(id,react) { return { type: postTypes.SET_REQUEST, id,react } }
    function success(react) { return { type: postTypes.SET_SUCCESS, react } }
    function failure(error) { return { type: postTypes.SET_FAILURE, error } }
}
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        postService.delete(id)
            .then(
                post => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error.toString()));
                }
            );
    };
    function request(id) { return { type: postTypes.DELETE_REQUEST, id } }
    function success(id) { return { type: postTypes.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: postTypes.DELETE_FAILURE,id ,error } }
}
