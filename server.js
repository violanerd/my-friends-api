const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection')
const app = express();
const routes = require('./routes')
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
mongoose.set('debug', true);



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for running on port ${PORT}!`);
  });
});







