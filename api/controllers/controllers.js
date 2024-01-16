const prepAllArticles = require("./prepAllArticles");
const prepAllCommentsById = require("./prepAllCommentsById");
const prepAllEndpoints = require("./prepAllEndpoints");
const prepAllTopics = require("./prepAllTopics");
const prepArticlesById = require("./prepArticlesById");
const prepNewComment = require("./prepNewComment");
const prepUpdateVotes = require("./prepVoteUpdates");

module.exports = { prepAllArticles, prepAllCommentsById, prepAllEndpoints, prepAllTopics, prepArticlesById, prepNewComment, prepUpdateVotes };