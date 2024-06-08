// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backend_url from './constant'
// const Backend_url = 'http://localhost:5000'; // Update to your backend URL

const App = () => {
    const [accessToken, setAccessToken] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('access_token');
        const user = urlParams.get('user');

        if (token && user) {
            setAccessToken(token);
            setUserData(JSON.parse(decodeURIComponent(user)));
        }
    }, []);

    const handleLogin = () => {
        window.location.href = `${Backend_url}/login`;
    };

    return (
        <div>
            <h1>Google OAuth Login</h1>
            {!accessToken && (
                <button onClick={handleLogin}>Login with Google</button>
            )}
            {userData && (
                <div>
                    <h2>User Data</h2>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
