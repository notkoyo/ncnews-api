const db = require('../../db/connection');

const getAllTopics = async () => {
  const { rows } = await db.query('SELECT * FROM topics');
  return rows;
};

module.exports = getAllTopics;