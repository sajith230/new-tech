const { body, param, query, check } = require("express-validator");

exports.validateCreateProduct = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim(),

  body("smallDescription")
    .notEmpty()
    .withMessage("Small description is required")
    .isString()
    .withMessage("Small description must be a string")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  body("productImages").custom((value, { req }) => {
    const files = req.files;
    if (!files || files.length === 0) {
      throw new Error("At least one product image is required");
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024;

    files.forEach((file) => {
      if (!allowedTypes.includes(file.mimetype)) {
        throw new Error("Only JPEG, PNG, or GIF images are allowed");
      }
      if (file.size > maxSize) {
        throw new Error("Each image must be smaller than 2 MB");
      }
    });
    return true;
  }),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("discountPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount price must be a positive number")
    .custom((value, { req }) => {
      if (value > req.body.price) {
        throw new Error("Discount price cannot be greater than price");
      }
      return true;
    }),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array")
    .custom((attrs) => {
      attrs.forEach((attr) => {
        if (!attr.attribute) {
          throw new Error("Each attribute must include an attribute ID");
        }
        if (
          !Array.isArray(attr.selectedVariations) ||
          attr.selectedVariations.length === 0
        ) {
          throw new Error(
            "Each attribute must include at least one selected variation"
          );
        }
      });
      return true;
    }),

  body("categories")
    .isArray({ min: 1 })
    .withMessage("At least one category must be included")
    .custom((cats) => {
      if (!cats.every((id) => typeof id === "string")) {
        throw new Error("Categories must be an array of IDs (strings)");
      }
      return true;
    }),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be either true or false"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .toLowerCase()
    .isIn(["draft", "public", "private"])
    .withMessage('Status must be one of "draft", "public" or "private"'),
];

exports.validateUpdateProduct = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim(),

  body("smallDescription")
    .notEmpty()
    .withMessage("Small description is required")
    .isString()
    .withMessage("Small description must be a string")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  body("existingProductImages")
    .optional()
    .isArray()
    .withMessage("existingProductImages must be an array")
    .custom((arr) => {
      if (!Array.isArray(arr)) return false;
      return arr.every((item) => typeof item === "string");
    })
    .withMessage("existingProductImages must be an array of image URLs"),

  body("newProductImages")
    .optional()
    .custom((value, { req }) => {
      const files = req.files;
      if (!files || files.length === 0) {
        throw new Error("At least one product image is required");
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 2 * 1024 * 1024;

      files.forEach((file) => {
        if (!allowedTypes.includes(file.mimetype)) {
          throw new Error("Only JPEG, PNG, or GIF images are allowed");
        }
        if (file.size > maxSize) {
          throw new Error("Each image must be smaller than 2 MB");
        }
      });
      return true;
    }),

  check().custom((value, { req }) => {
    const existingImages = req.body.existingProductImages;
    const newFiles = req.files;

    const hasExistingImages =
      Array.isArray(existingImages) && existingImages.length > 0;
    const hasNewImages = newFiles && newFiles.length > 0;

    if (!hasExistingImages && !hasNewImages)
      throw new Error("At least one product image is required");
    return true;
  }),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("discountPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount price must be a positive number")
    .custom((value, { req }) => {
      if (value > req.body.price) {
        throw new Error("Discount price cannot be greater than price");
      }
      return true;
    }),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array")
    .custom((attrs) => {
      attrs.forEach((attr) => {
        if (!attr.attribute) {
          throw new Error("Each attribute must include an attribute ID");
        }
        if (
          !Array.isArray(attr.selectedVariations) ||
          attr.selectedVariations.length === 0
        ) {
          throw new Error(
            "Each attribute must include at least one selected variation"
          );
        }
      });
      return true;
    }),

  body("categories")
    .isArray({ min: 1 })
    .withMessage("At least one category must be included")
    .custom((cats) => {
      if (!cats.every((id) => typeof id === "string")) {
        throw new Error("Categories must be an array of IDs (strings)");
      }
      return true;
    }),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be either true or false"),

  body("status")
    .optional()
    .toLowerCase()
    .isIn(["draft", "public", "private"])
    .withMessage('Status must be one of "draft", "public" or "private"'),
];

exports.validateGetProducts = [
  query("status")
    .optional()
    .toLowerCase()
    .isIn(["draft", "public", "private"])
    .withMessage(
      'Status must be one of "draft", "public", "private", or omitted completely'
    ),
  query("isFeatured")
    .optional()
    .isBoolean()
    .withMessage(
      "isFeatured must be either true or false, or omitted completely"
    ),
];

exports.validateIdParam = [
  param("id").isMongoId().withMessage("Invalid role ID"),
];
