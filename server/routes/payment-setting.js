const express = require("express");
const router = express.Router();
const paymentSettingController = require("../controllers/payment-setting");
const {
  validateUpdatePaymentSettings,
  validateBankAccount,
  validateCodDetails,
  validateIdParam,
} = require("../validators/payment-setting-validator");
const { runValidation } = require("../middleware/validate");

router.get("/", paymentSettingController.getPaymentSettings);

router.patch(
  "/",
  validateUpdatePaymentSettings,
  runValidation,
  paymentSettingController.updatePaymentSettings
);

router.post(
  "/account",
  validateBankAccount,
  runValidation,
  paymentSettingController.addBankAccount
);

router.patch(
  "/account/:id",
  validateIdParam,
  validateBankAccount,
  runValidation,
  paymentSettingController.updateBankAccount
);

router.delete(
  "/account/:id",
  validateIdParam,
  runValidation,
  paymentSettingController.deleteBankAccount
);

router.patch(
  "/cod",
  validateCodDetails,
  runValidation,
  paymentSettingController.updateCodDetails
);

module.exports = router;
