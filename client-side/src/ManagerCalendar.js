import React, { useState } from 'react';
import Header from './header'; // Adjust the import path as needed
import ManagerSideBar from './ManagerSideBar'; // Adjust the import path as needed
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ManagerCalendar.css';

const ManagerCalendar = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [events, setEvents] = useState([]); // Manage events state locally
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTask, setSelectedTask] = useState(null);

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
                <button type="submit">Add event</button>
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
