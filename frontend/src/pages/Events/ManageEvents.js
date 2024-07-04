import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from './EventForm';
import { FormTitle } from '../../components/form/FormTitle';

export const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
        } catch (error) {
            console.error('Error fetching events', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
            <div className='card w-[600px] border-1 border p-6 bg-[#ffffff]'>
                <FormTitle title='Sign Up' />
                <EventForm event={selectedEvent} onSuccess={fetchEvents} />
                <ul>
                    {events.map((event) => (
                        <li key={event._id} className="mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl">{event.title}</h3>
                                    <p>{event.date}</p>
                                </div>
                                <div>
                                    <button onClick={() => setSelectedEvent(event)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};
