const db = require("../../db/connection");

const updateVotes = async (id, newVotes) => {
  try {
    const { rows: article_id } = await db.query(
      "SELECT article_id FROM articles WHERE article_id = $1",
      [id]
    );
    const { rows: voteCount } = await db.query(
      "SELECT votes FROM articles WHERE article_id = $1",
      [id]
    );
    const { votes } = voteCount[0];
    const totalVotes = votes + newVotes;
    const { rows: article } = await db.query(
      `
  UPDATE articles 
  SET votes = $1
  WHERE article_id = $2
  RETURNING *
  `,
      [totalVotes, id]
    );
    return { article: article[0] };
  } catch (err) {
    if (err.message.includes("undefined"))
      return { status: 404, msg: "Article not found" };
    if (err.message.includes("invalid"))
      return { status: 400, msg: "Bad Request" };
  }
};

module.exports = updateVotes;
