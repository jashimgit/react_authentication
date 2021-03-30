/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './use-auth';

const Navbar = () => {
    // get auth state and re-render anytime it changes
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
        <nav>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/dashboard">Dashboard</Link>
                {auth.user ? (
                    <>
                        <Link to="/home">User: {auth.user.displayName}</Link>
                        <button type="submit" onClick={() => auth.signout()}>
                            Signout
                        </button>
                    </>
                ) : (
                    // <button type="button" onClick={() => auth.googleSignIn()}>
                    //     Sign In
                    // </button>
                    <button type="button"> Register</button>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
