const express = require("express");
const {
  prepAllArticles,
  prepAllCommentsById,
  prepAllEndpoints,
  prepAllTopics,
  prepArticlesById,
} = require("./controllers/controllers");
const app = express();

app.get("/api/topics", prepAllTopics);
app.get("/api", prepAllEndpoints);
app.get("/api/articles/:article_id", prepArticlesById);
app.get("/api/articles", prepAllArticles);
app.get("/api/articles/:article_id/comments", prepAllCommentsById);

app.use((err, req, res, next) => {
  if (err.message && err.status) {
    res.status(err.status).send({ msg: err.message });
  }
  next(err);
});

module.exports = app;
