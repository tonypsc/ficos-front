import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const PrivateRoute = ({component: Component, ...rest}) => {

    const validateToken = () => {
        return jwt.verify(localStorage.getItem('token'), '123456789abcdefghijklmnopqrst.*-+/ABCDEFGHIJKLMNOPQRSTWXYZ0', (err, data) => {
            if (err) {
                localStorage.setItem('token', '');
                return false;
            } 
            return true;
        })
    }

    return (
        <Route {...rest} render={props => (
            validateToken()
                ? <Component {...props} />
                : <Redirect to="/login" />
        )} />        
    )
}


export default PrivateRoute;