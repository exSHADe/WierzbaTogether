import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {postActions} from '../../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/pl';
import PostModal from "../../MenagePost/modal"
import Chat from "./Chat"

moment.updateLocale('pl', localization);

export default ()=> {
    const postsState = useSelector(state => state.posts);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const[getPage, setPage] = useState(0);
    const[getModalEdit, setModalEdit] = useState({
        launch: false,
        id: null
    });


    useEffect(() => {
        dispatch(postActions.getPosts(user.id,getPage))
    }, [getPage]);

    function onReact(id,react){
        dispatch(postActions.setReact(id,{"userID" : user.id, "vote" : react}))
    }
    function onDelete(id)
    {
        dispatch(postActions.delete(id));
        dispatch(postActions.getPosts(user.id,getPage))
    }
    function pagination(num)
    {
        if(!num && getPage-1<0) return
        setPage(num?getPage+1:getPage-1)
    }
    return (
    <>
    <div className="col-lg-8 col-md-10 mx-auto">
        <div className="row mb-3">
            <div className="col d-flex justify-content-center">{getPage!=0 && <a className="btn ownBtn btn-primary text-nowrap" onClick={()=>pagination(false)} href="#">&larr; Page {getPage}</a>}</div>
            <div className="col d-flex justify-content-center"><button className="btn ownBtn btn-primary text-nowrap text-white" onClick={()=>{ setModalEdit({launch:!getModalEdit.launch, id:"empty" })}}>Add Post</button></div>
            <div className="col d-flex justify-content-center">{postsState.next && <a className="btn ownBtn btn-primary text-nowrap" onClick={()=>pagination(true)} href="#">Page {getPage+1} &rarr;</a>}</div>
        </div>
        {postsState.loading && <em>Loading posts...</em>}
        {postsState.error && <span className="text-danger">ERROR: {postsState.error}</span>}
        {postsState.items &&
            postsState.items.map((post)=>{
                let react = Array.isArray(post.reacts) && post.reacts.find(react => react.userID == user.id) || null
                if(react) react = react.vote
                return (
                <div key={post.id} className="post-preview">
                    <div className="post-preview-a">
                        <div className="row mb-2 mt-4">
                            <h2 className="col-auto m-0 mr-auto post-title">{post.title}</h2>
                        </div>
                        <h3 className="post-subtitle">{post.content}</h3>
                    </div>
                    <div className="row">
                        <p className="col-auto m-0 mr-auto post-meta"><a className="post-meta-a"> {post.firstName} {post.lastName} </a><u>@{post.tag}</u> {moment(post.createdAt).calendar(null,{sameElse : 'LL'})}</p>
                        <p className="col-xl-auto mt-3 mt-xl-0 col-12 mb-0  mr-lg-4 d-flex justify-content-center">
                            {(post.authorID===user.id || user.accountType != 0) && 
                            //<Link to={{pathname:"/menage-post" , isEdited:true ,id:post.id }} ><i className="fas fa-cogs fa-2x mr-4 toHover " style={{color: "#868e96" }}/></Link>
                            <i className="fas fa-cogs fa-2x mr-4 toHover " onClick={()=>setModalEdit({launch:!getModalEdit.launch ,id:post.id })} style={{color: "#868e96" }}/>
                            } 
                            {(post.authorID===user.id || user.accountType != 0 )&&
                            <i className="fas fa-dumpster-fire fa-2x mr-4 toHover" style={{color: "#868e96" }} onClick={()=>onDelete(post.id)} />} 
                            <i className="fas fa-beer fa-2x toHover" style={{color: react === true ? "rgba(81,226,195,1)" : "#868e96"}} onClick={() => onReact(post.id,true)}></i>
                            <span className="h4 ml-3 mr-3"> {post.reactCounter}</span>
                            <i className="fas fa-heart-broken fa-2x toHover" style={{color: react === false ? "dodgerblue" : "#868e96" }} onClick={() => onReact(post.id, false)}></i>
                        </p>
                    </div>
                    <hr></hr>
                </div>
            )})
        }
        <div className="row clearfix mb-3">
            <div className="col d-flex justify-content-center">{getPage!=0 && <a className="btn ownBtn btn-primary text-nowrap" onClick={()=>pagination(false)} href="#">&larr; Page {getPage}</a>}</div>
            <div className="col d-flex justify-content-center"><PostModal getPage={getPage} isEdited={getModalEdit}/></div>
            <div className="col d-flex justify-content-center">{postsState.next && <a className="btn ownBtn btn-primary text-nowrap" onClick={()=>pagination(true)} href="#">Page {getPage+1} &rarr;</a>}</div>
        </div>
    </div>

        <div className="col-lg-4 col-md-10 mx-auto">
                <Chat getPage={getPage}></Chat>
            <div className="row px-3">
            <div className="post-preview">
                <a>
                <h2 className="post-title">
                    News
                </h2>
                <h3 className="post-subtitle">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Nowe koszulki z serii Wierzba2Night, zobacz sam!</li>
                        <li className="list-group-item">Policja pod wierzbą, czy to wojna?</li>
                        <li className="list-group-item">Głowa w betoniarce! zobacz to na żywo</li>
                        <li className="list-group-item"><b>22.12.2020 20.00</b> Wspólny kociołek pod wierzbą, zapraszamy!</li>
                    </ul>
                </h3>
                </a>
            </div>
        </div>
        </div>
    </>
    );

}