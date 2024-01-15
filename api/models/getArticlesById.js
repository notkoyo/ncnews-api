const db = require('../../db/connection');

const getArticlesById = async (id) => {
  const { rows } = await db.query('SELECT * FROM articles WHERE article_id = $1', [ id ]);
  return { article: rows[0] }
};

module.exports = getArticlesById;