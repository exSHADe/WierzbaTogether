import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import {bURL} from '../utilities';

const login = async(login,password) =>
{
    const sender =await axios.post(`${bURL}users/authenticate`,
        {login,password}
    )
    .catch(error=> {
        if(error.response){
            if(error.response.status !== 200 ||error.response.status !== 201)
            {
                if (error.response.status === 401) {
                    logout();
                    window.location.reload(true);
                } 
                if(error.response.status === 400)  return Promise.reject(error.response.data.message);
                    return Promise.reject(error.response.statusText);
            }
        }
        else if (error.request) 
            return Promise.reject("Server is busy, try again later!");
        else 
            return Promise.reject("Whoops, try again later!");

    })
    if ( sender.data && sender.data.token) localStorage.setItem('user', JSON.stringify(sender.data));
    return sender.data;          
}

const logout=()=>{
    localStorage.removeItem('user');
}

const getAll=async()=>{
    const sender = await axios.get(`${bURL}users`,
    {
        headers:authHeader()
    })
    .catch(error=> {
        let err = error.response;
        if (err.status === 401) {
            logout();
            window.location.reload(true);
        } 
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const getById =async(id)=> {
    const sender = await axios.get(`${bURL}users/${id}`,
    {
        headers:authHeader()
    }).catch(error=> {
        let err = error.response;
        if (err.status === 401) {
            //auto logout if 401 response returned from api
            logout();
            window.location.reload(true);
        } 
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const register =async(user)=> {
    const sender = await axios.post(`${bURL}users/register`,user).catch(error=> {
        let err = error.response;
        if(err.status === 400)  return Promise.reject(err.data.message);
        if (err.status === 401) {
            //auto logout if 401 response returned from api
            logout();
            window.location.reload(true);
        } 
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const update =async(user)=>{
    const sender = await axios.put(`${bURL}users/${user.id}`,user,
    {headers:authHeader()})
    .catch(error=> {
        let err = error.response;
        if(err.status === 400)  return Promise.reject(err.data.message);
        if (err.status === 401) {
            //auto logout if 401 response returned from api
            logout();
            window.location.reload(true);
        } 
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    if ( sender.data && sender.data.token) localStorage.setItem('user', JSON.stringify(sender.data));
    return sender.data;
}
const updateWithoutSave =async(user)=>{
    const sender = await axios.put(`${bURL}users/${user.id}`,user,
    {headers:authHeader()})
    .catch(error=> {
        let err = error.response;
        if(err.status === 400)  return Promise.reject(err.data.message);
        if (err.status === 401) {
            //auto logout if 401 response returned from api
            logout();
            window.location.reload(true);
        } 
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}
const  _delete = async(id)=>{
    const sender = await axios.delete(`${bURL}users/${id}`,
    {headers:authHeader(),
    id}).catch(error=> {
        let err = error.response;
        if (err.status === 401) {
            //auto logout if 401 response returned from api
            logout();
            window.location.reload(true);
        } 
        if(err.status !== 200 ||err.status !== 201) return Promise.reject(err.statusText);
    })
    return sender.data;
}

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    updateWithoutSave,
    delete: _delete
};