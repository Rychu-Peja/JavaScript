const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
// Dodaj pozostałe trasy: getEvent, updateEvent, deleteEvent

module.exports = router;
