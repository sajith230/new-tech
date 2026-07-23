const express = require("express");
const router = express.Router();
const attributeController = require("../controllers/attribute");
const {
  validateCreateAttribute,
  validateUpdateAttribute,
  validateIdParam,
} = require("../validators/attribute-validator");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateCreateAttribute,
  runValidation,
  attributeController.createAttribute
);

router.get("/", attributeController.getAttributes);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  attributeController.getAttributeById
);

router.patch(
  "/:id",
  validateIdParam,
  validateUpdateAttribute,
  runValidation,
  attributeController.updateAttribute
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  attributeController.deleteAttribute
);

// Check if attribute is being used by products
router.get(
  "/:id/usage",
  validateIdParam,
  runValidation,
  attributeController.checkAttributeUsage
);

// Check if a specific variation is being used by products
router.get(
  "/:id/variation/:variation/usage",
  validateIdParam,
  runValidation,
  attributeController.checkVariationUsage
);

module.exports = router;
