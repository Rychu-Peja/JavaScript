const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const filePath = 'C:\\Users\\jedzi\\Desktop\\JS-zaliczenie\\event-planner\\public\\index.html';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public', { extensions: ['html', 'css', 'js'] }));
app.use(express.static('src'));

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/event-planner', {})
  .then(() => console.log('MongoDB connected'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Trasy
app.use('/events', eventRoutes);

// Obsługa ścieżki głównej
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  readHTMLFile(filePath, (err, html) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(html);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
