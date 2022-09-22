const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const {User, Thought } = require('./models');

app.get('/users', (req, res) => {
    User.find({}, (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(result);
      });
})

app.get('/thoughts', (req, res) => {
    Thought.find({}, (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(result);
      });
})



mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/my-friends-api',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


mongoose.set('debug', true);

//app.use(require('./routes'));





app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));