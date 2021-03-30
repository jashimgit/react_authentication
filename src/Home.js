import React from 'react';
import { useAuth } from './use-auth';

const Home = () => {
    const auth = useAuth();
    return (
        <div style={{ textAlign: 'center' }}>
            <h3>this is home Page</h3>
            <br />
            {auth.user && auth.user.displayName}
        </div>
    );
};

export default Home;
