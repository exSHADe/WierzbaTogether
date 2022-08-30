import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {useSelector,useDispatch } from 'react-redux';
import {postService } from '../../services/postService';
import {alertActions} from '../../../redux/actions'
import {history} from '../../helpers/history';

export default (props)=>{
    const user = useSelector(state => state.authentication.user);
    const postsState = useSelector(state => state.posts);
    const [post,putPost] = useState(
        {firstName:"",
        lastName:"",
        authorID:"",
        title:"",
        content:"",
        tag:"anyone"}
    );  
    const [getGroups,setGroups] = useState(null);
    useEffect(()=>{
        let temp = postsState.items?.map(x => x.tag)
        setGroups([...new Set(temp)]);
    },[postsState])

    useEffect(()=>{
        if(props.location?.isEdited === true)
        {
            postService.getPost(props.location.id)
            .then(resp=>putPost(resp))
            .catch(err=>console.log(err))
        }
        else
        {
            putPost({
                firstName:user.firstName,
                lastName:user.lastName,
                authorID:user.id, 
                tag:"anyone"
            })
        }
    },[]) 

    function add(e)
    {
        e.preventDefault();
        postService.add(post)
        .then(resp=>history.push('/'))
        .catch(err=>alert(err))
    }
    function edit(e)
    {
        e.preventDefault();
        postService.edit(post)
        .then(resp=>history.push('/'))
        .catch(err=>alert(err))
    }

    return (
    <>
        <header className="masthead m-0">
            <div className="overlay"></div>
            <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                    <h1 className="Montserrat">Wierzba Tonight</h1>
                    <span className="subheading">Some text</span>
                </div>
                </div>
            </div>
            </div>
        </header>

        <div className="container inner-wrap">
            <div className="row p-4">
                <div className="col-md-10 offset-md-3 m-auto pt-4">
                    <div className="card shadow rounded card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">{props.location?.isEdited === true && "Edytuj Post" || "Dodaj Post"}</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" role="form" autoComplete="off"  
                            onSubmit={props.location?.isEdited ? edit:add}>
                                <fieldset>
                                    <label htmlFor="title" className="mb-0">Tytuł</label>
                                    <div className="row mb-1">
                                        <div className="col-lg-12">
                                        <input type="text" value={post.title} onChange={(e)=>{putPost({...post ,title:e.target.value})}} name="title" id="title" className="form-control"/>
                                        </div>
                                    </div>                                    
                                    <label htmlFor="content" className="mb-0">Treść</label>
                                    <div className="row mb-1">
                                        <div className="col-lg-12">
                                            <textarea value={post.content} onChange={(e)=>{putPost({...post ,content:e.target.value})}} rows="6" name="content" id="content" className="form-control" required></textarea>
                                        </div>
                                    </div>
                                    <hr className="my-4"/>
                                    <div className="row mb-1">
                                        <div className="col-sm-3">
                                        {props.location?.isEdited===true && 
                                            <button className="btn btn-primary w-100 p-2 px-4 rounded float-left">Edit</button> ||
                                            <button className="btn btn-primary w-100 p-2 px-4 rounded float-left">Add</button>
                                        }
                                        </div>
                                        <div className="col-sm-3 ml-auto">
                                        <select className="form-control" id="tag" name="tag" value={post.tag} onChange={(e)=>{putPost({...post,tag:e.target.value})}}>
                                        {user.groups && user.accountType === 0 && user.groups?.map((group) => 
                                            <option key={group} value={group}>{group}</option>)}
                                        {user.groups && (user.accountType === 1 || user.accountType === 2) && getGroups?.map((tag) => 
                                            <option key={tag} value={tag}>{tag}</option>)}
                                        </select>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>




            </div>
        </div>
        
        <hr></hr>

        <footer className="headerbar">
            <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                <p className="copyright Montserrat text-white">Copyright &copy; Your Website 2020</p>
                </div>
            </div>
            </div>
        </footer>
    </>
);

}
