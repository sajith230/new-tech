const parseNumber = (field) => {
  return (req, res, next) => {
    try {
      req.body[field] = Number(req.body[field]);
      next();
    } catch {
      return res.status(400).json({
        message: `Failed to parse ${field} to a number`,
      });
    }
  };
};

module.exports = { parseNumber };
