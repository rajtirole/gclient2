import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Backend_url = 'https://gserver5.onrender.com'; // Update to your backend URL

const App = () => {
    const [accessToken, setAccessToken] = useState('');
    const [reviews, setReviews] = useState([]);
    const [responseText, setResponseText] = useState('');
    const [selectedReviewId, setSelectedReviewId] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('access_token');
        if (token) {
            setAccessToken(token);
            fetchReviews(token);
        }
    }, []);

    const fetchReviews = async (token) => {
        const response = await axios.get(`${Backend_url}/reviews?access_token=${token}`);
        setReviews(response.data.reviews);
    };

    const publishResponse = async () => {
        await axios.post(`${Backend_url}/publish`, {
            accessToken,
            reviewId: selectedReviewId,
            responseText
        });
        fetchReviews(accessToken);
    };

    const handleLogin = () => {
        window.location.href = `${Backend_url}/login`;
    };

    return (
        <div>
            <h1>Reviews Dashboard</h1>
            {!accessToken && (
                <button onClick={handleLogin}>Login with Google</button>
            )}
            {reviews.length > 0 && (
                <div>
                    {reviews.map((review) => (
                        <div key={review.reviewId}>
                            <p>{review.comment}</p>
                            <button onClick={() => setSelectedReviewId(review.reviewId)}>Respond</button>
                        </div>
                    ))}
                </div>
            )}
            {selectedReviewId && (
                <div>
                    <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)}></textarea>
                    <button onClick={publishResponse}>Publish</button>
                </div>
            )}
        </div>
    );
};

export default App;
