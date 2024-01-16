const prepAllArticles = require("./prepAllArticles");
const prepAllCommentsById = require("./prepAllCommentsById");
const prepAllEndpoints = require("./prepAllEndpoints");
const prepAllTopics = require("./prepAllTopics");
const prepArticlesById = require("./prepArticlesById");
const { prepDeleteComment } = require("./prepDeleteComment");
const prepNewComment = require("./prepNewComment");
const prepUpdateVotes = require("./prepVoteUpdates");
const prepAllUsers = require("./prepAllUsers");

module.exports = { prepAllArticles, prepAllCommentsById, prepAllEndpoints, prepAllTopics, prepArticlesById, prepNewComment, prepUpdateVotes, prepDeleteComment, prepAllUsers };