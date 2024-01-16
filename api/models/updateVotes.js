const db = require('../../db/connection');

const updateVotes = async (id, newVotes) => {
  const { rows: article_id } = await db.query('SELECT article_id FROM articles WHERE article_id = $1', [ id ]);
  if (!article_id.length > 0) return { status: 404, msg: "Article not found" }
  if (newVotes === undefined) return { status: 400, msg: "Bad Request" }
  const { rows: voteCount} = await db.query('SELECT votes FROM articles WHERE article_id = $1', [ id ]);
  const { votes } = voteCount[0];
  const totalVotes = votes + newVotes;
  const { rows: article } = await db.query(`
  UPDATE articles 
  SET votes = $1
  WHERE article_id = $2
  RETURNING *
  `, [ totalVotes, id ]);
  return { article: article[0] }
};

module.exports = updateVotes;