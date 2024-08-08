import React, { useState } from 'react';
import Header from './header'; // Adjust the import path as needed
import ManagerSideBar from './ManagerSideBar'; // Adjust the import path as needed
import './ManagerSurveyDistribution.css'; // Import the CSS file

const ManagerSurveyDistribution = () => {
    const [surveyFrequency, setSurveyFrequency] = useState('monthly');
    const [additionalQuestion, setAdditionalQuestion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Survey settings: Frequency: ${surveyFrequency}, Additional Question: ${additionalQuestion}`);
    };

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
