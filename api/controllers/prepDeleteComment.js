const { deleteComment } = require("../models/deleteComment");

exports.prepDeleteComment = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const deleted = await deleteComment(comment_id);
    deleted.rowCount === 1 ? res.status(204).send() : res.status(404).send();
  } catch (err) {
    next(err);
  }
};
