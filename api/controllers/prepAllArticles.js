const getAllArticles = require("../models/getAllArticles")

const prepAllArticles = async (req, res, next) => {
  try {
    const { topic } = req.query;
    const articles = await getAllArticles(topic);
    res.send({ articles });
  } catch (err) { next(err) }
}

module.exports = prepAllArticles;