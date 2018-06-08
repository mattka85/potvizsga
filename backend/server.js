const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const db = require('./config/database.js');
const Starwars = require('./models/starwars');
const starwarsRouter = require('./route/starwars.route');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();
const helmet = require('helmet');
const cors = require('cors');

// Logging
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});
app.use(morgan('combined', {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
}));

app.use(helmet());
// TODO: Add helmet

// Body Parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Connect to the db
mongoose.connect(db.uri, db.options)
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch((err) => {
    console.error(`MongoDB error.:${err}`);
  });
// TODO: Connect to MongoDB
app.use(cors({
  origin: 'http://localhost:4200',
}));
// TODO: Enable CORS

// TODO: Use Starwars router
app.use('/', starwarsRouter);

// Start server
app.listen(port);
