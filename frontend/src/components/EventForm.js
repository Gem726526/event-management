import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ event, onSuccess }) => {
    const [title, setTitle] = useState(event ? event.title : '');
    const [description, setDescription] = useState(event ? event.description : '');
    const [date, setDate] = useState(event ? event.date : '');
    const [location, setLocation] = useState(event ? event.location : '');
    const [category, setCategory] = useState(event ? event.category : '');
    const [tags, setTags] = useState(event ? event.tags.join(', ') : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = { title, description, date, location, category, tags: tags.split(',').map(tag => tag.trim()) };
        try {
            if (event) {
                await axios.put(`http://localhost:5000/api/events/${event._id}`, eventData);
            } else {
                await axios.post('http://localhost:5000/api/events', eventData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error creating/updating event', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Title:</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                    className="w-full px-3 py-2 border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Date:</label>
                <input
                    type="date"
                    className="w-full px-3 py-2 border rounded"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Location:</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Category:</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Tags:</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {event ? 'Update Event' : 'Create Event'}
            </button>
        </form>
    );
};

export default EventForm;
