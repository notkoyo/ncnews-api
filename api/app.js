const express = require("express");
const cors = require("cors");
const {
  prepAllArticles,
  prepAllCommentsById,
  prepAllEndpoints,
  prepAllTopics,
  prepArticlesById,
  prepNewComment,
  prepUpdateVotes,
  prepDeleteComment,
  prepAllUsers,
} = require("./controllers/controllers");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/topics", prepAllTopics);
app.get("/api", prepAllEndpoints);
app.get("/api/articles/:article_id", prepArticlesById);
app.get("/api/articles", prepAllArticles);
app.get("/api/articles/:article_id/comments", prepAllCommentsById);
app.get("/api/users", prepAllUsers);

app.post("/api/articles/:article_id/comments", prepNewComment);

app.patch("/api/articles/:article_id", prepUpdateVotes);

app.delete("/api/comments/:comment_id", prepDeleteComment);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found'})
})

app.use((err, req, res, next) => {
  if (err.message && err.status) {
    res.status(err.status).send({ msg: err.message });
  }
  next(err);
});

module.exports = app;
