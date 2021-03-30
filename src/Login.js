/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './use-auth';

const Login = () => {
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: '/' } };

    const login = () => {
        auth.googleSignIn(() => {
            history.replace(from);
        });
    };
    return (
        <div style={{ textAlign: 'center' }}>
            <h3>Please Login with your Google Account</h3>
            <button onClick={login}> Login With Google</button>
        </div>
    );
};

export default Login;
