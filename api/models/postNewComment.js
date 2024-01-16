const db = require("../../db/connection");

const postNewComment = async (article_id, commentData) => {
  const { username, body } = commentData;
  const { rows: users } = await db.query("SELECT username FROM users");
  const userCheck = users.some((user) => user.username === username);
  if (!userCheck) {
    return { status: 404, msg: "User not found" };
  } else {
    const { rows: comment } = await db.query(
    `
    INSERT INTO comments (body, author, article_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [body, username, article_id]
    );
    return comment[0];
  }
};

module.exports = postNewComment;
