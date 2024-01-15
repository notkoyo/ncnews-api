const getAllArticles = require("../models/getAllArticles")

const prepAllArticles = async (req, res, next) => {
  try {
    const articles = await getAllArticles();
    res.send({ articles });
  } catch (err) { next(err) }
}

module.exports = prepAllArticles;