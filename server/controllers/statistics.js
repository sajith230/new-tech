const Statistics = require("../models/statistics");

exports.getStatistics = async (req, res) => {
  try {
    let statistics = await Statistics.findOne().populate("topProducts.product");
    if (!statistics) statistics = await Statistics.create({});

    statistics.topProducts.sort((a, b) => b.purchasedTimes - a.purchasedTimes);
    statistics.monthlyEarnings.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetStatistics = async (req, res) => {
  try {
    await Statistics.deleteOne();
    const statistics = await Statistics.create({});

    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
