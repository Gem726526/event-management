import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormTitle } from '../../components/form/FormTitle';
import { inputFieldClassName } from '../../constants/classnames';

export const EventList = () => {
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
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
            <div className='card w-[600px] border-1 border p-6 bg-[#ffffff]'>
                <FormTitle title='Event List' />
                <div className="mb-4">
                    <input
                        type="text"
                        className={inputFieldClassName}
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <select
                        className={inputFieldClassName}
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
                        className={inputFieldClassName}
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
        </div>
    );
};
