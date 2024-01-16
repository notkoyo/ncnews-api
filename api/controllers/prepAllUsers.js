const { getAllUsers } = require("../models/getAllUsers")

const prepAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch (err) { next(err) }
}

module.exports = prepAllUsers;