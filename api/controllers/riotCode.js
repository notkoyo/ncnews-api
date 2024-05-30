const sendRiotCode = (req, res, next) => {
  try {
    res.send("45cba775-74b3-4de5-8a93-e29a59678ce9")
  } catch (error) {
    next(err)
  }
}

module.exports = sendRiotCode;