const { deleteComment } = require("../models/deleteComment");

exports.prepDeleteComment = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const deleted = await deleteComment(comment_id);
    const { status, msg } = deleted;
    res.status(status).send({ msg })
  } catch (err) { next(err) }
};
