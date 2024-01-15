const getAllTopics = require("../models/getAllTopics");

const prepAllTopics = async (req, res, next) => {
  try {
    const topics = await getAllTopics();
    res.status(200).send({ topics });
  } catch (err) { next(err) }
};

module.exports = prepAllTopics;