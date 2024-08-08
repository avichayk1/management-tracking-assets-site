import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EmployeeCalendar.css';
import EmployeeSideBar from './EmployeeSideBar'; // Assuming you have this component
import Header from './header'; // Assuming you have this component

const EmployeeCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([
        { title: 'Lamp repair for the David Babyan asset', date: '2024-03-13' },
        { title: 'Gas leak test for Or Cohen asset', date: '2024-02-13' },
        { title: 'Staff meeting', date: '2024-04-01' },
        { title: 'Signing a rent contract for Shir Levi asset', date: '2024-02-29' },
        { title: 'Issuing a monthly financial report', start: '2024-03-01', end: '2024-03-04' },
    ]);
    const [selectedTask, setSelectedTask] = useState(null);

    const onDateChange = (newDate) => {
        setDate(newDate);
    };

    const renderTasksForDate = (date) => {
        const tasksForDate = tasks.filter(task =>
            task.date === date.toISOString().split('T')[0] ||
            (task.start && new Date(task.start) <= date && new Date(task.end) >= date)
        );

        if (tasksForDate.length > 0) {
            return (
                <div className="tasks-on-date">
                    {tasksForDate.map(task => (
                        <div
                            key={task.title}
                            className="task"
                            onClick={() => setSelectedTask(task)}
                        >
                            {task.title}
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
