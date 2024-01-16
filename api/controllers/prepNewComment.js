const postNewComment = require("../models/postNewComment");

const prepNewComment = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { body } = req;
    !Number(article_id) ? res.status(400).send('Bad Request') : false;
    const comment = await postNewComment(article_id, body);
    comment.status === 400 ? res.status(400).send('Bad Request') : false;
    !comment.hasOwnProperty('status') ? res.status(201).send({ comment }) : res.status(404).send(comment.msg)
  } catch (err) { next(err) }
}

module.exports = prepNewComment;