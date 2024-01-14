const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const Event = require('../src/models/Event');
const eventController = require('./controllers/eventController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/event-planner', {})
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error('MongoDB connection error:', error));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/events', eventController.createEvent);

app.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.render('index', { events, eventName: '', eventDate: '', eventTime: '' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve events' });
  }
});

async function removeEvent(eventId) {
  try {
    const response = await fetch(`/events/${eventId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Event removed');
    } else {
      console.log('Failed to remove event');
    }
  } catch (error) {
    console.error(error);
  }
}

let editingEventId = null;

function editEvent(eventId) {
  const event = events.find(e => e._id === eventId);

  if (event) {
    document.getElementById('editEventName').value = event.eventName;
    document.getElementById('editEventDate').value = event.eventDate;
    document.getElementById('editEventTime').value = event.eventTime;

    editingEventId = eventId;

    document.querySelector('.edit-form-container').style.display = 'block';
  }
}

function updateEvent() {
  const editEventName = document.getElementById('editEventName').value;
  const editEventDate = document.getElementById('editEventDate').value;
  const editEventTime = document.getElementById('editEventTime').value;

  if (!editEventName || !editEventDate || !editEventTime) {
    console.error('All fields must be filled out');
    return;
  }

  fetch(`/events/${editingEventId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName: editEventName, eventDate: editEventDate, eventTime: editEventTime }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Event updated');
        location.reload();
      } else {
        console.log('Failed to update event');
      }
    })
    .catch(error => console.error(error));
}

function cancelEdit() {
  document.querySelector('.edit-form-container').style.display = 'none';
  editingEventId = null;
}

app.delete('/events/:id', eventController.deleteEvent);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
