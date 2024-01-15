const getArticlesById = require("../models/getArticlesById");

const prepArticlesById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const articleData = await getArticlesById(article_id);
    articleData.article !== undefined ? res.send(articleData) : res.status(404).send();
  } catch (err) { next(err) }
};

module.exports = prepArticlesById;