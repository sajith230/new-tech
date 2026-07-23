const parseJson = (field) => {
  return (req, res, next) => {
    try {
      req.body[field] = JSON.parse(req.body[field]);
      next();
    } catch {
      return res.status(400).json({
        message: `Failed to parse ${field} to JSON`,
      });
    }
  };
};

module.exports = { parseJson };
