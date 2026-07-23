const express = require("express");
const router = express.Router();
const multer = require("../utils/multer");
const productController = require("../controllers/product");
const {
  validateCreateProduct,
  validateGetProducts,
  validateUpdateProduct,
  validateIdParam,
} = require("../validators/product-validator");
const { parseJson } = require("../middleware/parse-json");
const { parseNumber } = require("../middleware/parse-number");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  multer.array("productImages", 5),
  parseJson("categories"),
  parseJson("attributes"),
  parseNumber("price"),
  parseNumber("discountPrice"),
  parseNumber("quantity"),
  validateCreateProduct,
  runValidation,
  productController.createProduct
);

router.get(
  "/",
  validateGetProducts,
  runValidation,
  productController.getProducts
);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  productController.getProductById
);

router.patch(
  "/:id",
  multer.array("newProductImages", 5),
  parseJson("existingProductImages"),
  parseJson("categories"),
  parseJson("attributes"),
  parseNumber("price"),
  parseNumber("discountPrice"),
  parseNumber("quantity"),
  validateIdParam,
  validateUpdateProduct,
  runValidation,
  productController.updateProduct
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  productController.deleteProduct
);

module.exports = router;
