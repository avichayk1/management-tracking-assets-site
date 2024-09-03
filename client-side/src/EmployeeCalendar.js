import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EmployeeCalendar.css';
import EmployeeSideBar from './EmployeeSideBar'; // Assuming you have this component
import Header from './header'; // Assuming you have this component
import { useParams ,useLocation} from 'react-router-dom';
import axios from 'axios';
const EmployeeCalendar = () => {
    const {id}=useParams();
    const location = useLocation(); // Access the location object
    const [message, setMessage] = useState('');

    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const employee_id = queryParams.get('employee_id'); 
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([
        // { title: 'Lamp repair for the David Babyan asset', date: '2024-03-13' },
        // { title: 'Gas leak test for Or Cohen asset', date: '2024-02-13' },
        // { title: 'Staff meeting', date: '2024-04-01' },
        // { title: 'Signing a rent contract for Shir Levi asset', date: '2024-02-29' },
        // { title: 'Issuing a monthly financial report', start: '2024-03-01', end: '2024-03-04' },
    ]);
    const [selectedTask, setSelectedTask] = useState(null);


    const onDateChange = (newDate) => {
        setDate(newDate);
    };

    const renderTasksForDate = (date) => {
        const tasksForDate = tasks.filter(task =>
            task.date === date.toISOString().split('T')[0] 
            // ||
            // (task.start && new Date(task.start) <= date && new Date(task.end) >= date)
        );

        if (tasksForDate.length > 0) {
            return (
                <div className="tasks-on-date">
                    {tasksForDate.map(task => (
                        <div
                            key={task.name_}
                            className="task"
                            onClick={() => setSelectedTask(task)}
                        >
                            {task.name_}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const closeTaskDetails = () => {
        setSelectedTask(null);
    };
    useEffect(() => {
        console.log("heeeeeeeeeeeey")
        const fetchEmployeeTasksDetails = async () => {
            // const id = 3;
            console.log("your ikd is "+id)
            try {
                const response = await axios.get(`http://localhost:3001/employee-task-details/${employee_id}`); // Replace with your actual endpoint
                console.log(response.data)
                           // Flatten the tasks and normalize the date format
            const flattenedTasks = response.data.tasks.flat().map(task => ({
                ...task,
                date: task.date_.split('T')[0] // Extract just the YYYY-MM-DD part
            }));
                setTasks(flattenedTasks)
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchEmployeeTasksDetails();
    }, []);
    return (
        <div className="employee-calendar">
            <Header />
            <EmployeeSideBar />
            <div className="calendar-container">
                <Calendar
                    onChange={onDateChange}
                    value={date}
                    locale="en-US"
                    tileContent={({ date }) => renderTasksForDate(date)}
                />
            </div>
            {selectedTask && (
                <div className="task-details">
                    <div className="task-details-content">
                        <h1>{selectedTask.title}</h1>
                        <p>Date: {selectedTask.date || `${selectedTask.start} to ${selectedTask.end}`}</p>
                        <button onClick={closeTaskDetails}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeCalendar;
