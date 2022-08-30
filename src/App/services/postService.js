import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import {bURL} from '../utilities';

const add = async(post) => {
    const sender = await axios.post(`${bURL}posts/add`,post,
    {
        headers:authHeader(),
    })
    .catch(error=> {
        let err = error.response;
        if(err.status === 400)  return Promise.reject(err.data.message);
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const getAllPost = async(id,page) => {
    const sender = await axios.get(`${bURL}posts/all:${id}/${page}`,
    {
        headers:authHeader(),
        id
    }) 
    .catch(error=> {
        let err = error.response;
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const getPost = async(id) => {
    const sender = await axios.get(`${bURL}posts/${id}`,
    {
        headers:authHeader(),
        id
    })
    .catch(error=> {
        let err = error.response;
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const edit = async(post) => { //edit post
    const sender = await axios.put(`${bURL}posts/edit:${post.id}`,post,
    {
        headers:authHeader(),
    })
    .catch(error=> {
        let err = error.response;
        if(err.status === 400)  return Promise.reject(err.data.message);
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const _delete = async(id) => {
    const sender = await axios.delete(`${bURL}posts/${id}`,
    {
        headers:authHeader(),
        id
    })
    .catch(error=> {
        let err = error.response;
        if (err.status === 401) {
            //auto logout if 401 response returned from api
            //logout();
            //window.location.reload(true);
        } 
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const calc = async(id) =>{ //count reacts 
    const sender = await axios.put(`${bURL}posts/calc:${id}`,
    {
        headers:authHeader()
    })
    .catch(error=> {
        let err = error.response;
        if(err.status === 400)  return Promise.reject(err.data.message);
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const set = async(id,react) =>{ //put react
    const sender = await axios.put(`${bURL}posts/${id}/set`,react,
    {
        headers:authHeader()
    })
    .catch(error=> {
        let err = error.response;
        if(err.status === 400)  return Promise.reject(err.data.message);
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const getAllReacts = async(id) =>{
    const sender = await axios.get(`${bURL}posts/${id}/reacts`,
    {
        headers:authHeader()
    })
    .catch(error=> {
        let err = error.response;
        if(err.status === 400)  return Promise.reject(err.data.message);
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const getCurrentReact = async(id,uID) =>{
    const sender = await axios.get(`${bURL}posts/${id}/react:${uID}`,
    {
        headers:authHeader()
    })
    .catch(error=> {
        let err = error.response;
        if(err.status === 400)  return Promise.reject(err.data.message);
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}

export const postService = {
    add,
    getAllPost,
    getPost,
    edit,
    delete: _delete,
    calc,
    set,
    getAllReacts,
    getCurrentReact,
};