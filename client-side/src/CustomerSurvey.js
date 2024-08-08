import React, { useState } from 'react';
import axios from 'axios';
import Header from './header'; // Ensure correct import path
import CustomerSideBar from './CustomerSideBar'; // Ensure correct import path
import './CustomerSurvey.css'; // CSS for styling

const CustomerSurvey = () => {
    const [rating, setRating] = useState('5');
    const [improvementSuggestion, setImprovementSuggestion] = useState('');
    const [recommendation, setRecommendation] = useState('yes');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:9124/survey', {
                rating,
                improvementSuggestion,
                recommendation
            });
            if (response.status === 200) {
                setMessage('הסקר התקבל');
                setRating('5');
                setImprovementSuggestion('');
                setRecommendation('yes');
            } else {
                setMessage('שגיאה בשליחת הסקר');
            }
        } catch (error) {
            console.error('Error during sending survey:', error);
            setMessage('שגיאה בשליחת הסקר');
        }
    };

    return (
        <div className="customerSurvey">
            <Header />
            <CustomerSideBar />
            <div className="container9">
                <h90>User Survey</h90>
                <form id="surveyForm" onSubmit={handleSubmit}>
                    <div className="question">
                        <p className="question-label">1. How would you rate your overall experience with our product?</p>
                        <div className="question-text">
                            {["5", "4", "3", "2", "1"].map(num => (
                                <label key={num}>
                                    <input type="radio" name="rating" value={num}
                                           checked={rating === num}
                                           onChange={() => setRating(num)} />
                                    {num} - {num === '5' ? 'Very Satisfied' : num === '4' ? 'Satisfied' : num === '3' ? 'Neutral' : num === '2' ? 'Dissatisfied' : 'Very Dissatisfied'}
                                    <br />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="question">
                        <p className="question-label">2. What is one thing you would like to see improved?</p>
                        <textarea id="improvementSuggestion" name="improvementSuggestion"
                                  rows="5" placeholder="Enter your suggestions here"
                                  value={improvementSuggestion}
                                  onChange={(e) => setImprovementSuggestion(e.target.value)} />
                    </div>

                    <div className="question">
                        <p className="question-label">3. Would you recommend our product to a friend?</p>
                        <label>
                            <input type="radio" name="recommendation" value="yes"
                                   checked={recommendation === 'yes'}
                                   onChange={() => setRecommendation('yes')} /> Yes
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="recommendation" value="no"
                                   checked={recommendation === 'no'}
                                   onChange={() => setRecommendation('no')} /> No
                        </label>
                    </div>

                    <button type="submit" className="button">Submit Survey</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default CustomerSurvey;
