/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

require('dotenv').config();
// Add your Firebase credentials
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_API_ID,
    });
}

const authContext = createContext();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) =>
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });

    const googleSignIn = () =>
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((response) => {
                // console.log(result);
                setUser(response);
                return response.user;
            })
            .catch((error) => {
                console.log(error);
            });

    const signup = (email, password) =>
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });

    const signout = () =>
        firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            });

    const sendPasswordResetEmail = (email) =>
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => true);

    const confirmPasswordReset = (code, password) =>
        firebase
            .auth()
            .confirmPasswordReset(code, password)
            .then(() => true);

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Return the user object and auth methods
    return {
        user,
        signin,
        googleSignIn,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}
