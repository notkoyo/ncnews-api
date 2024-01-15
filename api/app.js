const express = require('express');
const prepAllTopics = require('./controllers/prepAllTopics');
const app = express();

app.get('/api/topics', prepAllTopics);

app.use((err, req, res, next) => {
  if (err.message && err.status) {
    res.status(err.status).send({ msg: err.message });
  }
  next(err);
});

module.exports = app;
