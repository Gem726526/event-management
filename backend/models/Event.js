const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
    },
    category: {
        type: String,
    },
    tags: [String],
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
