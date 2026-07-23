const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");
const { validateContactMessage } = require("../validators/contact-validator");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateContactMessage,
  runValidation,
  contactController.createContactMessage
);

module.exports = router;
