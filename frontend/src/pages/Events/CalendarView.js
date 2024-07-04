import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { FormTitle } from '../../components/form/FormTitle';

export const CalendarView = () => {
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
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
            <div className='card w-[600px] border-1 border p-6 bg-[#ffffff]'>
                <FormTitle title='Calendar' />
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
        </div>
    );
};
