const db = require("../../db/connection");

const getArticlesById = async (id) => {
  const { rows } = await db.query(`
  SELECT articles.*, 
    COALESCE(COUNT(comments.comment_id), 0) AS comment_count
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  WHERE articles.article_id = $1
  GROUP BY articles.article_id`,
    [id]
  );
  return { article: rows[0] };
};

module.exports = getArticlesById;
