const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const Event = require('../models/Event');

// Endpoint do tworzenia nowego wydarzenia
router.post('/events', eventController.createEvent);

// Endpoint do pobierania wszystkich wydarzeń
router.get('/events', eventController.getAllEvents);

// Endpoint do aktualizacji wydarzenia
router.put('/events/:id', eventController.updateEvent);

// Endpoint do usuwania wydarzenia
router.delete('/events/:id', eventController.deleteEvent);

// Endpoint do tworzenia nowego wydarzenia
//router.post('/events', async (req, res) => {
//  const { eventName, eventDate, eventTime } = req.body;
//
//  const newEvent = new Event({
//    eventName,
//    eventDate,
//    eventTime,
//  });
//
//  try {
//    await newEvent.save();
//    res.status(201).json({ message: 'Event created' });
//  } catch (err) {
//    console.error(err);
//    res.status(500).json({ message: 'Failed to create event' });
//  }
//});
//
//// Get all events
//router.get('/events', async (req, res) => {
// try {
//    const events = await Event.find({});
//    res.send(events);
// } catch (error) {
//    console.error(error);
//    res.status(500).send(error);
// }
//});
//
//// Update event
//router.put('/events/:id', async (req, res) => {
// const { id } = req.params;
// const { eventName, eventDate, eventTime } = req.body;
//
// try {
//    const event = await Event.findByIdAndUpdate(id, { eventName, eventDate, eventTime }, { new: true });
//    res.send(event);
// } catch (error) {
//    console.error(error);
//    res.status(500).send(error);
// }
//});
//
//// Delete event
//router.delete('/events/:id', async (req, res) => {
// const { id } = req.params;
//
// try {
//    const event = await Event.findByIdAndDelete(id);
//    res.send(event);
// } catch (error) {
//    console.error(error);
//    res.status(500).send(error);
// }
//});

module.exports = router;