import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import  NavMenu  from '../Layout/NavMenu';

export default ({ component: Component, roles, ...rest })=>{
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user')) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return (<>
                <NavMenu />
                <Component {...props} />
                </>)
        }} />
    );
}
