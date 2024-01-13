const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const Event = require('../models/Event');

//Create event
router.post('/events', async (req, res) => {
    const { eventName, eventDate, eventDescription } = req.body;

    try {
        const event = new Event({ eventName, eventDate, eventDescription });
        await event.save();
        res.send(event);
    }   catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Get all events
router.get('/events', async (req, res) => {
    try {
      const events = await Event.find({});
      res.send(events);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  // Update event
  router.put('/events/:id', async (req, res) => {
    const { id } = req.params;
    const { eventName, eventDate, eventDescription } = req.body;
  
    try {
      const event = await Event.findByIdAndUpdate(id, { eventName, eventDate, eventDescription }, { new: true });
      res.send(event);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  // Delete event
  router.delete('/events/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const event = await Event.findByIdAndDelete(id);
      res.send(event);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

module.exports = router;
