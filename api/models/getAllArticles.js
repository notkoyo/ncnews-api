const db = require('../../db/connection');

const getAllArticles = async () => {
  const { rows } = await db.query('SELECT * FROM articles');
  return rows;
};

module.exports = getAllArticles;