import React, { useState } from 'react';
import Header from './header'; // Adjust the import path as needed
import ManagerSideBar from './ManagerSideBar'; // Adjust the import path as needed
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ManagerCalendar.css';
import axios from 'axios';
import { useParams ,useLocation} from 'react-router-dom';
const ManagerCalendar = () => {
    const {id}=useParams();

    console.log("id from parms "+id)
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const manager_id = queryParams.get('manager_id'); 
    console.log("manager_id from quary "+manager_id)
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTeam, setEventTeam] =useState('')
    const [events, setEvents] = useState([]); // Manage events state locally
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTask, setSelectedTask] = useState(null);
    const [message, setMessage]=useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEvent = {
            title: eventName,
            date: eventDate,
            allDay: true // Optional: depending on your calendar's needs
        };
        setEvents([...events, newEvent]); // Update the events array
        setEventName('');
        setEventDate('');
    };

    const handleDayClick = (date) => {
        const task = events.find(event => event.date === date.toISOString().split('T')[0]);
        setSelectedTask(task);
    };

    const add_event = async (e) => {
        e.preventDefault();
        console.log("i am in add_event func")
        const updatedData = {
            eventName: eventName,
            eventDate: eventDate,
            eventTeam: eventTeam
            // manager_id: manager_id
        };
        try {
            console.log(`http://localhost:3001/addTask/${manager_id}`)
            const response = await axios.put(`http://localhost:3001/addTask/${manager_id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Task added successfuly")
            const { message } = response.data;
            setMessage(message);
            // setError('')
        } catch (error) {
            console.error('Error during update:', error);
            // setError('Server error');
        }

    }
    return (
        <div className="managerCalendar">
            <Header />
            <ManagerSideBar />
            <form id="eventForm" onSubmit={handleSubmit}>
                <label htmlFor="eventName">Event Name:</label><br />
                <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                /><br />
                <label htmlFor="eventDate">Event Date:</label><br />
                <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                /><br />
                <label htmlFor="eventTeam">Event Team:</label><br />
                <input
                    type="text"
                    id="eventTeam"
                    name="eventTeam"
                    value={eventTeam}
                    onChange={(e) => setEventTeam(e.target.value)}
                /><br />
                <button type="submit" onClick={add_event}>Add event</button>
            </form>
            <div className="smallCalendar">
                <Calendar
                    locale="en-US" // Set the locale to English
                    onChange={setSelectedDate}
                    value={selectedDate}
                    onClickDay={handleDayClick}
                />
                {selectedTask && (
                    <div className="task-modal">
                        <div className="task-modal-content">
                            <h2>Task Details</h2>
                            <p>{selectedTask.title}</p>
                            <button onClick={() => setSelectedTask(null)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagerCalendar;
