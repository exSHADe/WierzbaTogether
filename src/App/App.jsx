import React, {useEffect} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {history} from './helpers/history';
import {alertActions} from '../redux/actions';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import Login from './components/userForms/Login';
import Register from './components/userForms/Register';
import MenagePost from './components/MenagePost';
import Profile from './components/Profile';

export default ()=>{
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/menage-post" component={MenagePost} />
                <PrivateRoute exact path="/admin" component={AdminPanel} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}
