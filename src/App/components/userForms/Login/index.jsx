import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../redux/actions';
import '../Styles/styles.css';


export default ()=> {
    const [inputs, setInputs] = useState({
        login: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { login, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useSelector(state => state.alert);

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (login && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(login, password, from));
        }
    }

    return (
    <section className="page-section formBacground h-100">
        <div className="container h-100">
            <div className="row align-items-center h-100">
                <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">              
                            <h5 className="card-title text-center">Sign In</h5>
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            } 
                            <form className="form-signin" name="form" onSubmit={handleSubmit}>
                                <div className="form-label-group">
                                    <input type="text" id="inputLogin" name="login" value={login} onChange={handleChange} className={'form-control' + (submitted && !login ? ' is-invalid' : '')} placeholder="Login"  autoFocus/>
                                    {submitted && !login &&
                                        <div className="invalid-feedback ml-4">login is required</div>
                                    }
                                    <label htmlFor="inputLogin">Login</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} placeholder="Password" />
                                    {submitted && !password &&
                                        <div className="invalid-feedback ml-4">Password is required</div>
                                    }
                                    <label htmlFor="inputPassword">Password</label>
                                </div>

                                <button className="btn btn-lg btn-info btn-block text-uppercase">
                                    {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Sign in
                                </button>
                                
                                <hr className="my-4"/>

                                <Link to="/register" className="btn btn-lg btn-primary  btn-block text-uppercase">Sign Up</Link>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}