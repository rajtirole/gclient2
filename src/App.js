// App.js
import React, { useState, useEffect } from 'react';

const App = () => {
    const [accessToken, setAccessToken] = useState('');
    const [userData, setUserData] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('access_token');
        const user = urlParams.get('user');
        const reviewsData = urlParams.get('reviews');

        if (token && user && reviewsData) {
            setAccessToken(token);
            setUserData(JSON.parse(decodeURIComponent(user)));
            setReviews(JSON.parse(decodeURIComponent(reviewsData)));
        }
    }, []);

    const handleLogin = () => {
        window.location.href = 'https://gserver5.onrender.com/login'; // Update to your backend URL
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
            {reviews.length > 0 && (
                <div>
                    <h2>Reviews</h2>
                    {reviews.map((review, index) => (
                        <div key={index}>
                            <p><strong>{review.reviewer.displayName}:</strong> {review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
