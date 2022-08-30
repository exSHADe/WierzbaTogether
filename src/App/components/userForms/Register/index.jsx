import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../../../../redux/actions';
//import '../Styles/styles.css';

export default ()=>{
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        userMail: '',
        password: '',
        group: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.userName && user.userMail && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <section className="page-section formBacground h-100">
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign Up</h5>
                                <form className="form-signin" name="form" onSubmit={handleSubmit}>

                                    <div className="form-label-group">
                                        <input type="text" id="inputFirstName" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} placeholder="firstName" autoFocus/>
                                        {submitted && !user.firstName &&
                                            <div className="invalid-feedback ml-4">First Name is required</div>
                                        }
                                        <label htmlFor="inputFirstName">First Name</label>
                                    </div>                      
        
                                    <div className="form-label-group">
                                        <input type="text" id="inputLastName" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} placeholder="lastName" />
                                        {submitted && !user.lastName &&
                                            <div className="invalid-feedback ml-4">Password is required</div>
                                        }
                                        <label htmlFor="inputLastName">Last Name</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="text" id="inputUserName" name="userName" value={user.userName} onChange={handleChange} className={'form-control' + (submitted && !user.userName ? ' is-invalid' : '')} placeholder="userName" />
                                        {submitted && !user.userName &&
                                            <div className="invalid-feedback ml-4">Username is required</div>
                                        }
                                        <label htmlFor="inputUserName">User Name</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="email" id="inputEmail" name="userMail" value={user.userMail} onChange={handleChange} className={'form-control' + (submitted && !user.userMail ? ' is-invalid' : '')} placeholder="userMail" />
                                        {submitted && !user.userMail &&
                                            <div className="invalid-feedback ml-4">Mail is required</div>
                                        }
                                        <label htmlFor="inputEmail">Email</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} placeholder="password" />
                                        {submitted && !user.password &&
                                            <div className="invalid-feedback ml-4">Password is required</div>
                                        }
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>                               

                                    <select className="form-control" id="group" name="group" 
                                    value={user.group} onChange={handleChange}>
                                        <option value=''>Choose your group</option>
                                        <option value="PAI 2020">PAI 2020</option>
                                        <option value="IO 2020">IO 2020</option>
                                        <option value="SK 2020">SK 2020</option>
                                    </select>
                                    
                                    <button className="btn btn-lg btn-info btn-block text-uppercase">
                                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Sign Up
                                    </button>
                                    
                                    <hr className="my-4"/>
        
                                    <Link to="/login" className="btn btn-lg btn-primary btn-block text-uppercase">Cancel</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
