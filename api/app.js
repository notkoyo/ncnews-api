const express = require('express');
const prepAllTopics = require('./controllers/prepAllTopics');
const prepAllEndpoints = require('./controllers/prepAllEndpoints');
const prepArticlesById = require('./controllers/prepArticlesById');
const app = express();

app.get('/api/topics', prepAllTopics);
app.get('/api', prepAllEndpoints);
app.get('/api/articles/:article_id', prepArticlesById);

app.use((err, req, res, next) => {
  if (err.message && err.status) {
    res.status(err.status).send({ msg: err.message });
  }
  next(err);
});

module.exports = app;
