import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

const Backend_url = 'http://localhost:5000'; // Update to your backend URL

const App = () => {
    const [accessToken, setAccessToken] = useState('');
    const [reviews, setReviews] = useState([]);
    const [responseText, setResponseText] = useState('');
    const [selectedReviewId, setSelectedReviewId] = useState('');
    const [loading, setLoading] = useState(true);
    const HomePage=()=>{
        return <div>
        <h1>Reviews Dashboard</h1>
        {/* {!accessToken && (
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
        )} */}
    </div>
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('access_token');
        if (token) {
            setAccessToken(token);
            fetchReviews(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchReviews = async (token) => {
        try {
            const response = await axios.get(`${Backend_url}/reviews?access_token=${token}`);
            setReviews(response.data.reviews);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setLoading(false);
        }
    };  

    const publishResponse = async () => {
        try {
            await axios.post(`${Backend_url}/publish`, {
                accessToken,
                reviewId: selectedReviewId,
                responseText
            });
            fetchReviews(accessToken);
        } catch (error) {
            console.error('Error publishing response:', error);
        }
    };

    const handleLogin = () => {
        // window.location.href = `${Backend_url}/login`;
        window.open('http://localhost:5000/login',"_self")
        // window.open('http://localhost:5000/auth/google/callback',"_self")
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <Routes>
        <Route path='/' element={<div><HomePage></HomePage></div>}></Route>
        <Route path='/home' element={<div>HomePage</div>}></Route>
        <Route path='/test' element={<div>hello</div>}></Route>
      </Routes>
    );
};

export default App;
