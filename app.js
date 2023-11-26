const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
require('dotenv').config();

const userRoute = require('./route/userDataRoute');

const app = express();

try {
  app.use(favicon(path.join(__dirname, 'favicon.ico')));
} catch (error) {
  console.error('Error setting favicon:', error);
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the root path!');
});

app.use('/api', userRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Error connecting to the database:', err));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
