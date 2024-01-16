const updateVotes = require("../models/updateVotes");

const prepUpdateVotes = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    !Number(article_id) ? res.status(400).send('Bad Request') : false;
    const updatedArticle = await updateVotes(article_id, inc_votes);
    !updatedArticle.status ? res.send(updatedArticle) : res.status(updatedArticle.status).send(updatedArticle.msg);
  } catch (err) { next(err) }
};

module.exports = prepUpdateVotes;