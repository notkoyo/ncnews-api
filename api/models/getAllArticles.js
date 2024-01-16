const db = require("../../db/connection");

const getAllArticles = async (topic = 0) => {
  const args = [];
  let query = `
  SELECT
    articles.author,
    articles.title,
    articles.article_id,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
  COUNT(comments.comment_id) AS comment_count
  FROM articles
  LEFT JOIN
    comments ON articles.article_id = comments.article_id
`;
  if (topic !== 0) {
    query += `
    WHERE articles.topic = $1
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`;
    args.push(topic);
  } else {
    query += `
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`;
  }
  const { rows } = await db.query(query, args);
  return rows;
};

module.exports = getAllArticles;
