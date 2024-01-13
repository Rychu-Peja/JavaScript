const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const filePath = 'C:\\Users\\jedzi\\Desktop\\JS-zaliczenie\\event-planner\\views\\index.ejs';
const eventController = require('./controllers/eventController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../views'));  // Poprawiona ścieżka do widoków
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/event-planner', {})
  .then(() => console.log('MongoDB connected'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Trasy
//app.use('/events', eventRoutes);
app.post('/events', eventController.createEvent);

// Obsługa ścieżki głównej
app.get('/', (req, res) => {
  res.render('index', { eventName: '', eventDate: '', eventTime: '' }); // Dodaj puste wartości na początku
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
