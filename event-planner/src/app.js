const path = require('path');
const fs = require('fs');

function readHTMLFile(filePath, callback) {
  fs.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      throw err;
    } else {
      callback(null, html);
    }
  });
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const filePath = 'C:\\Users\\jedzi\\Desktop\\JS-zaliczenie\\event-planner\\public\\index.html';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/event-planner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Trasy
app.use('/events', eventRoutes);

// Obsługa ścieżki głównej
app.get('/', (req, res) => {
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
