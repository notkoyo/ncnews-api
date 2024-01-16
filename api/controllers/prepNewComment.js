const postNewComment = require("../models/postNewComment");

const prepNewComment = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { body } = req;
    const comment = await postNewComment(article_id, body);
    !comment.hasOwnProperty('status') ? res.status(201).send({ comment }) : res.status(comment.status).send(comment.msg)
  } catch (err) { next(err) }
}

module.exports = prepNewComment;