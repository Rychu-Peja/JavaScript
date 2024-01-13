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

module.exports = router;