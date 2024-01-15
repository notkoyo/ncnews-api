const getAllEndpoints = require("../models/getAllEndpoints");

const prepAllEndpoints = async (req, res, next) => {
  try {
    const endpoints = await getAllEndpoints();
    res.send(endpoints);
  } catch (err) { next(err) }
};

module.exports = prepAllEndpoints;