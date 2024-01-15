const fs = require('fs/promises')

const getAllEndpoints = async () => {
  const fileData = await fs.readFile('./api/endpoints.json');
  return JSON.parse(fileData);
};

module.exports = getAllEndpoints;