const Event = require('../models/Event');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create event
const newEvent = new Event({
  eventName: 'Zaliczenie',
  eventDate: '23.01.2024',
  eventDescription: 'Matma w sali 303 na godz. 10:30'
});

newEvent.save()
  .then(() => console.log('Event created'))
  .catch((err) => console.log(err));

// Read all events
Event.find()
  .then((events) => console.log(events))
  .catch((err) => console.log(err));

// Update event
Event.findOneAndUpdate({ eventName: 'Zaliczenie' }, { eventName: 'Poprawa' })
  .then(() => console.log('Event updated'))
  .catch((err) => console.log(err));

// Delete event
Event.deleteOne({ eventName: 'Poprawa' })
  .then(() => console.log('Event deleted'))
  .catch((err) => console.log(err));

module.exports = Event;
