// eventController.js
const Event = require('../models/Event');

// Create event
exports.createEvent = async (req, res) => {
  const { eventName, eventDate, eventTime } = req.body;

  console.log('Received request to create event:', { eventName, eventDate, eventTime });
  try {
    const event = new Event({ eventName, eventDate, eventTime });
    await event.save();
    
    console.log('Event saved successfully.');

    res.status(201).json({ message: 'Event created', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// Read all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve events' });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { eventName, eventDate, eventTime } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { eventName, eventDate, eventTime },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update event' });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    res.json(deletedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};
