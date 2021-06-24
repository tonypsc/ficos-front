import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
const userAccess = ['/costsheet', '/costsheet/edit', '/costelement', '/user/profile']
const adminAccess = ['/costsheet', '/costsheet/edit', '/costelement', '/user/profile', '/user', '/user/edit', '/user/add', '/configuration']
const saAccess = ['/user/profile', '/user', '/user/edit', '/user/add', '/enterprise', '/enterprise/add', '/enterprise/edit']

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

    const checkAccess = () => {
        const rol = JSON.parse(localStorage.getItem('user')).rol;

        if(rol === 'user') return userAccess.includes(rest.path);
        if(rol === 'admin') return adminAccess.includes(rest.path);
        if(rol === 'sa') return saAccess.includes(rest.path);

        return true;
    }

    return (
        <Route {...rest} render={props => (
            validateToken()
                ? checkAccess()
                    ? <Component {...props} />
                    : <Redirect to="/costsheet" />
                : <Redirect to="/login" />
        )} />        
    )
}


export default PrivateRoute;