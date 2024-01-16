const db = require("../../db/connection");

const postNewComment = async (article_id, commentData) => {
  try {
    const { username, body } = commentData;
    const { rows: comment } = await db.query(
      `
      INSERT INTO comments (body, author, article_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [body, username, article_id]
    );
    return comment[0];
  } catch (err) {
    if (err.constraint === undefined) return { status: 400, msg: 'Bad Request'}
    else return { status: 404, msg: 'Article not found' }
  }
};

module.exports = postNewComment;
