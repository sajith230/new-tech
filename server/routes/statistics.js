const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statistics");

router.get("/", statisticsController.getStatistics);
router.delete("/", statisticsController.resetStatistics);

module.exports = router;
