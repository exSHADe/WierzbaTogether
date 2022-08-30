import e from 'cors';
import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch } from 'react-redux';
import { userActions } from '../../../redux/actions';
import { alertActions} from '../../../redux/actions';
import {userService} from '../../services'

export default (props)=>{
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const [currentUser,setUser] = useState({
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        userMail:user.userMail,
        userName:user.userName
    });
    const [getGroup,setGroup] = useState("");
    const alert = useSelector(state => state.alert);

    const dispatch = useDispatch();

    useEffect(() => {
        if(user.accountType === 2) dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }
    function handleBanUser(user){

        userService.updateWithoutSave({id:user.id,isSuspended: user.isSuspended == "true" ? "false" : "true"})
        .then(
            user=>{ dispatch(userActions.getAll());
                    dispatch(alertActions.success('Update successful'));
                    setTimeout(() => dispatch(alertActions.clear()), 2400);
            },error=>{
                dispatch(alertActions.error(error.toString()));
                setTimeout(() => dispatch(alertActions.clear()), 2400);
            }
        )
    }

    function handleDeleteGroup(group) {
        const list = user.groups?.filter(x => x != group);
        dispatch(userActions.update({id:user.id,groups:list}));
    }

    function handleChangeType(user,type) {
        userService.updateWithoutSave({id:user.id, accountType: type})
        .then(
            user=>{ dispatch(userActions.getAll());
                    dispatch(alertActions.success('Update successful'));
                    setTimeout(() => dispatch(alertActions.clear()), 2400);
            },error=>{
                dispatch(alertActions.error(error.toString()));
                setTimeout(() => dispatch(alertActions.clear()), 2400);
            }
        )
    }

    function handleAddGroup() {
        let list = user.groups?.filter(x => x);
        if(list.includes(getGroup) || getGroup == "") return
        setGroup("")
        list.push(getGroup)
        dispatch(userActions.update({id:user.id,groups:list}));
    }

    function handleData(user){
        user.preventDefault();
        dispatch(userActions.update(currentUser));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(currentUser => ({ ...currentUser, [name]: value }));
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
                <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">User Information</h3>
                        </div>
                        <div className="card-body row">
                        {alert.message && <div className={`col-12 alert ${alert.type}`}>{alert.message}</div>} 
                        <div className="col-12 col-md-6">
                            <form className="form" role="form" autoComplete="off" 
                            onSubmit={handleData}>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-form-label form-control-label">First name</label>
                                    <div className="col-xl-9">
                                        <input className="form-control" type="text" name="firstName" onChange={handleChange} value={currentUser.firstName}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-form-label form-control-label">Last name</label>
                                    <div className="col-xl-9">
                                        <input className="form-control" type="text" name="lastName" onChange={handleChange} value={currentUser.lastName}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-form-label form-control-label">Email</label>
                                    <div className="col-xl-9">
                                        <input className="form-control" type="email" name="userMail" onChange={handleChange} value={currentUser.userMail}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-form-label form-control-label">Username</label>
                                    <div className="col-xl-9">
                                        <input className="form-control" type="text" name="userName" onChange={handleChange} value={currentUser.userName}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-form-label form-control-label">Password</label>
                                    <div className="col-xl-9">
                                        <input className="form-control" type="password" name="password" onChange={handleChange} placeholder="********" value={currentUser.password || ""}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-form-label form-control-label"></label>
                                    <div className="col-xl-9">
                                        <button className="btn ownBtn btn-primary" value="Save Changes">Update Profile</button>
                                    </div>
                                </div>
                            </form>
                            </div>
                            
                            {user.accountType !== 2 && <>
                            <div className="col-12 col-md-6">
                            
                            <div className="form-group list-group-flush row">
                            <label className="col-12 col-form-label form-control-label">Groups</label>
                            <div className="col-12 p-2 pl-4 pr-4 list-group">
                                <ul className="list-group list-group-flush">
                                    {user.groups.filter(x => x != "anyone").map((group) => { return(<>
                                        <li className="list-group-item">{group}
                                        {
                                            user.modifyGroup ? <em> - Deleting...</em> : 
                                            user.modifyGroupError ? <span className="text-danger"> - ERROR: {user.modifyGroupError}</span>: 
                                            <span> - <a onClick={() => handleDeleteGroup(group)} className="text-primary">Delete</a></span>
                                        }</li>
                                    </>) })}
                                </ul>
                            </div>
                            </div>
                                <div className="form-group row">
                                    <label style={{whiteSpace: "nowrap"}}className="col-xl-3 col-form-label form-control-label">New Group</label>
                                    <div className="col-xl-9">
                                        <input className="form-control" type="text" value={getGroup} onChange={e => setGroup(e.target.value)}/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-form-label form-control-label"></label>
                                    <div className="col-xl-9">
                                    <button className="btn ownBtn btn-primary pr-2 pl-2" onClick={handleAddGroup}>Add/Create group</button>
                                    </div>
                                </div>
                                </div>
                                </>}


                            {user.accountType == 2 && <>
                            <div className="col-12 col-md-6">
                            
                            <div className="form-group list-group-flush row">
                            <label className="col-12 col-form-label form-control-label">Users</label>
                            <div className="col-12 p-2 pl-4 pr-4 list-group" style={{overflow: "scroll", maxHeight: "700px"}}>
                                {users.loading && <em>Loading users...</em>}
                                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                                {users.items &&
                                   <ul className="list-group list-group-flush">
                                        {users.items.map((user) =>
                                            <li className="list-group-item row" key={user.id}>
                                                <div className="col-12 d-flex justify-content-center">
                                                {user.firstName + ' ' + user.lastName}</div>
                                                <div className="row px-3 mt-2">
                                                <div className="col-6 d-flex justify-content-center">
                                                {
                                                    user.deleting ? <em> - Deleting...</em>
                                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                    : <span><a onClick={() => handleDeleteUser(user.id)} className="text-primary ownBtn2">Delete</a></span>
                                                }</div>
                                                <div className="col-6 d-flex justify-content-center">
                                                {
                                                    user.modified ? <em> - Modified...</em>
                                                    : user.error ? <span className="text-danger"> - ERROR: {user.error}</span>
                                                : <span><a onClick={() => handleBanUser(user)} className="text-primary ownBtn2">{user.isSuspended == "true" ? "UNBAN" : "BAN"}</a></span>
                                                }</div></div>

                                                <div className="form-group col-12 mt-2">
                                                    <select className="form-control" id="accountType" name="accountType" value={user.accountType} onChange={e => handleChangeType(user,e.target.value)} >
                                                    <option value="0">USER</option>
                                                    <option value="1">MOD</option>
                                                    <option value="2">ADMIN</option>
                                                    </select>
                                                </div>

                                            </li>
                                        )}
                                    </ul>
                                }
                            </div>
                            </div>
                                </div>
                                </>}
                            
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
