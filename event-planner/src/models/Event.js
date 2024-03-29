const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;


