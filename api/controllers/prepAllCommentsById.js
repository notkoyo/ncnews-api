const getAllCommentsById = require("../models/getAllCommentsById");

const prepAllCommentsById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    !Number(article_id) ? res.status(400).send('Bad Request') : false;
    const commentsData = await getAllCommentsById(article_id);
    commentsData.comments !== undefined ? res.send(commentsData) : res.status(404).send();
  } catch (err) { next(err) }
};

module.exports = prepAllCommentsById;