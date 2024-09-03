import React, { useState } from 'react';
import Header from './header'; // Adjust the import path as needed
import ManagerSideBar from './ManagerSideBar'; // Adjust the import path as needed
import './ManagerSurveyDistribution.css'; // Import the CSS file
import axios from 'axios';
import { useParams ,useLocation} from 'react-router-dom';
const ManagerSurveyDistribution = () => {
    const {id}=useParams();

    console.log("id from parms "+id)
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const manager_id = queryParams.get('manager_id'); 
    console.log("manager_id from quary "+manager_id)
    const [surveyFrequency, setSurveyFrequency] = useState('monthly');
    const [additionalQuestion, setAdditionalQuestion] = useState('');
    const [customer,setCustomer]=useState('')
    const [message, setMessage]=useState('')

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log("i am in handleSubmit func")
        const updatedData = {
            frequency: surveyFrequency,
            more: additionalQuestion,
            customer_id: customer
            // manager_id: manager_id
        };
        try {
            console.log(`http://localhost:3001/addSurvey/${manager_id}`)
            const response = await axios.put(`http://localhost:3001/addSurvey/${manager_id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Survey added successfuly")
            const { message } = response.data;
            setMessage(message);
            // setError('')
        } catch (error) {
            console.error('Error during update:', error);
            // setError('Server error');
        }

    }
    console.log(`Survey settings: Frequency: ${surveyFrequency}, Additional Question: ${additionalQuestion}`);

    return (
        <div className="managerSurveyDistribution">
            <Header />
            <ManagerSideBar />
            <div className="container5">
                <h4>Survey Settings:</h4>
                <form id="surveyForm" onSubmit={handleSubmit}>
                    <label>Survey Frequency:</label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" name="surveyFrequency" value="monthly"
                                   checked={surveyFrequency === 'monthly'}
                                   onChange={() => setSurveyFrequency('monthly')} /> Monthly
                        </label>
                        <label>
                            <input type="radio" name="surveyFrequency" value="quarterly"
                                   checked={surveyFrequency === 'quarterly'}
                                   onChange={() => setSurveyFrequency('quarterly')} /> Quarterly
                        </label>
                        <label>
                            <input type="radio" name="surveyFrequency" value="yearly"
                                   checked={surveyFrequency === 'yearly'}
                                   onChange={() => setSurveyFrequency('yearly')} /> Yearly
                        </label>
                    </div>
                    <label>Customer id:</label>
                    <input
                    type="text"
                    id="customer"
                    name="customer"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                /><br />
                    <label>Additional Question:</label>
                    <textarea id="additionalQuestion" name="additionalQuestion"
                              rows="5" placeholder="Enter your additional question here"
                              value={additionalQuestion}
                              onChange={(e) => setAdditionalQuestion(e.target.value)} />

                    <button type="submit" className="button">Save Settings</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerSurveyDistribution;
