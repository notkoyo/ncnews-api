const db = require("../../db/connection");

const postNewComment = async (article_id, commentData) => {
  const { username, body } = commentData;
  const { rows: users } = await db.query("SELECT username FROM users");
  const userCheck = users.some((user) => user.username === username);
  const { rows: articles } = await db.query("SELECT * FROM articles WHERE article_id = $1", [ article_id ]);
  if (!username || !body) {
    return { status: 400, msg: "Bad Request"}
  }
  else if (!userCheck || articles.length === 0) {
    return { status: 404, msg: "Not found" };
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
