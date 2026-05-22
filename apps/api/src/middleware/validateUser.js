function validateUser(req, res, next) {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error: "Valid user name is required",
    });
  }

  next();
}

module.exports = validateUser;
