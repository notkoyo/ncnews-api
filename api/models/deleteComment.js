const db = require('../../db/connection');

exports.deleteComment = async (id) => {
  try {
    const deleted = await db.query('DELETE FROM comments WHERE comment_id = $1', [ id ]);
    return deleted.rowCount > 0 ? { status: 204 } : { status: 404, msg: 'ID Not Found'}
  } catch (err) {
    return err.code === "22P02" ? { status: 400, msg: 'Bad Request' } : err;
  }
}