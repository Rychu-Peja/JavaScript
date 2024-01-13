const Event = require('../models/Event');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create event
const newEvent = new Event({
  eventName: 'Urodziny ',
  eventDate: '15.02.2024',
  eventTime: '17:20'
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

const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
 const { eventName, eventDate, eventTime } = req.body;

 try {
    const event = new Event({ eventName, eventDate, eventTime });
    await event.save();
    res.send(event);
 } catch (error) {
    console.error(error);
    res.status(500).send(error);
 }
};