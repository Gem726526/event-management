import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
        } catch (error) {
            console.error('Error fetching events', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event => {
        return (
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterCategory ? event.category === filterCategory : true) &&
            (filterDate ? new Date(event.date).toDateString() === new Date(filterDate).toDateString() : true)
        );
    });

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Event List</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <select
                    className="w-full px-3 py-2 border rounded"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Category1">Category1</option>
                    <option value="Category2">Category2</option>
                </select>
            </div>
            <div className="mb-4">
                <input
                    type="date"
                    className="w-full px-3 py-2 border rounded"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>
            <ul>
                {filteredEvents.map((event) => (
                    <li key={event._id} className="mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl">{event.title}</h3>
                                <p>{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
