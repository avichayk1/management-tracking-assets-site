import React, { useState,useEffect } from 'react';
import { useParams,useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './header'; // Ensure correct import path
import CustomerSideBar from './CustomerSideBar'; // Ensure correct import path
import './CustomerSurvey.css'; // CSS for styling

const CustomerSurvey = () => {
    const [rating, setRating] = useState('5');
    const [improvementSuggestion, setImprovementSuggestion] = useState('');
    const [recommendation, setRecommendation] = useState('yes');
    const [message, setMessage] = useState('');
    const [opinion,setOpinion]=useState({})
    const {id}=useParams();
    const location = useLocation(); // Access the location object
    const navigate = useNavigate();

    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const customer_id = queryParams.get('customer_id'); 
    const opinion_id =queryParams.get('opinion_id')
    useEffect (()=>{
        console.log("I am in useEffect in CustomerSurvey");
        // const id = 1; // replace this with actual id from useParams or other source
        console.log("ID from params: " + id);

        console.log(`http://localhost:3001/customer-opinions-by-opinion_id/${opinion_id}`);
        
        const fetchCustomerOpinions = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/customer-opinions-by-opinion_id/${opinion_id}`);
                console.log(response.data);
                setOpinion(response.data.opinion)
                console.log("response.data.opinion",response.data.opinion)
                console.log("opinion",opinion)
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };

        fetchCustomerOpinions();
    },[])
      // Use another useEffect to log the opinion state when it changes
  useEffect(() => {
    console.log("Updated opinion state:", opinion);
  }, [opinion]);
      // Observe changes to opinion
    // useEffect(() => {
    //     console.log('Updated opinion:', opinion); // This will show the updated state correctly
    // }, [opinion]); // Run this effect whenever `opinion` changes
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/updateOpinion/${opinion_id}`, opinion,{
                headers: {
                'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setMessage('הסקר התקבל');
                navigate(`/CustomerArea/${id}?customer_id=${customer_id}`)
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
                        {[5, 4, 3, 2, 1].map(num => (
                            <label key={num}>
                            <input
                                type="radio"
                                name="rating"
                                value={num}
                                checked={opinion.rating === num} // Check if the opinion's rating matches the current num
                                onChange={() => {
                                    setOpinion(prev => ({ ...prev, rating: num }))// Update opinion's rating when selected
                                    console.log("rating",opinion.rating)
                                }}
                            />
                            {num} - {num === 5 ? 'Very Satisfied' : num === 4? 'Satisfied' : num === 3 ? 'Neutral' : num === 2 ? 'Dissatisfied' : 'Very Dissatisfied'}
                            <br />
                            </label>
                        ))}
                        </div>
                    </div>

                    <div className="question">
                        <p className="question-label">2. What is one thing you would like to see improved?</p>
                        <textarea id="improvementSuggestion" name="improvementSuggestion"
                                  rows="5" placeholder="Enter your suggestions here"
                                  value={opinion.negative_note}
                                  onChange={(e) => setOpinion(prev => ({ ...prev, negative_note: e.target.value }))} />
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
