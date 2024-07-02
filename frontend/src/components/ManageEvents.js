import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from './EventForm';

const ManageEvents = () => {
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
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
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
    );
};

export default ManageEvents;
