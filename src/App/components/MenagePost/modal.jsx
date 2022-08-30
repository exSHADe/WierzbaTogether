import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {useSelector,useDispatch } from 'react-redux';
import {postService} from '../../services/postService';
import {postActions} from '../../../redux/actions'

export default (props)=>{
    const user = useSelector(state => state.authentication.user);  
    const postsState = useSelector(state => state.posts);
    const dispatch = useDispatch();    

    const [post,putPost] = useState(
        {firstName:"",
        lastName:"",
        authorID:"",
        title:"",
        content:"",
        tag:"anyone"}
    );

    const [getGroups,setGroups] = useState(null);
    const [showModal,setShowModal] = useState({open:false,edit:false});

    useEffect(()=>{
        let temp = postsState.items?.map(x => x.tag)
        setGroups([...new Set(temp)]);
    },[postsState])

    useEffect(()=>{
        if(props?.isEdited.id == "empty")
            emptyModal()
        else if(props?.isEdited.id != null){
            postService.getPost(props.isEdited.id)
            .then(resp=>{putPost(resp)
            setShowModal({open:true,edit:true})})
            .catch(err=>console.log(err))
        }
    },[props?.isEdited.launch])

    function emptyModal(){
        putPost({
            firstName:user.firstName,
            lastName:user.lastName,
            authorID:user.id,
            title:"",
            content:"",
            tag:"anyone"
        })
        setShowModal({open:true,edit:false})
    }

    function add(sender)
    {
        sender.preventDefault();
        postService.add(post)
        .then(resp=>{console.log("success")
        dispatch(postActions.getPosts(user.id,props.getPage))})
        .catch(err=>alert(err))
        setShowModal(false)
    }
    function edit(sender)
    {
        sender.preventDefault();
        postService.edit(post)
        .then(resp=>{console.log("success")
        dispatch(postActions.getPosts(user.id,props.getPage))})
        .catch(err=>alert(err))
        setShowModal(false)
    }

    return (
    <>

        <a role="button" className="btn ownBtn btn-primary text-nowrap text-white" onClick={emptyModal}>Add Post</a>
        <dialog className={showModal.open ? "modal fade show d-block" : "modal fade d-none"} id="myModal" tabIndex="-1" role="dialog" aria-hidden="true" style={{backgroundColor:"rgba(0,0,0,0.4)"}}>
            <div className="modal-dialog modal-full" role="document" style={{top: "20%"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{showModal.edit === true && "Edytuj Post" || "Dodaj Post"}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setShowModal(false)}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form className="form" role="form" autoComplete="off" 
                            onSubmit={showModal.edit ? edit:add}>
                    <div className="modal-body p-4" id="result">
                            
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
                                </fieldset>
                    </div>
                    <div className="modal-footer">
                        <div className="col-sm-6 mx-0">
                                        {showModal.edit===true && 
                                            <button className="btn btn-primary w-100 p-2 px-4 rounded float-left">Edit</button> ||
                                            <button className="btn btn-primary w-100 p-2 px-4 rounded float-left">Add</button>
                                        }
                        </div>
                        <div className="col mx-0">
                            <select className="form-control" id="tag" name="tag" value={post.tag} onChange={(e)=>{putPost({...post,tag:e.target.value})}}>
                            {user.groups && user.accountType === 0 && user.groups?.map((group) => 
                                <option key={group} value={group}>{group}</option>)}
                            {user.groups && (user.accountType === 1 || user.accountType === 2) && getGroups?.map((tag) => 
                                <option key={tag} value={tag}>{tag}</option>)}
                            </select>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </dialog>





        

    </>
);

}
