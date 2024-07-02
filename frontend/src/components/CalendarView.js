import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const start = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
            const end = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
            try {
                const res = await axios.get('http://localhost:5000/api/events/by-date', {
                    params: { start, end }
                });
                setEvents(res.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };
        fetchEvents();
    }, [date]);

    const onChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Calendar</h2>
            <Calendar value={date} onChange={onChange} />
            <div className="mt-4">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event._id} className="mb-4">
                            <h3 className="text-xl">{event.title}</h3>
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                            <p>{event.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No events for this month.</p>
                )}
            </div>
        </div>
    );
};

export default CalendarView;
