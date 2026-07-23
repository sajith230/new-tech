const express = require("express");
const router = express.Router();
const multer = require("../utils/multer");
const userRoleController = require("../controllers/user");
const {
  validateCreateUser,
  validateCreateGoogleUser,
  validateGetUsers,
  validateUpdateUser,
  validateIdParam,
  validateUidParam,
  validateEmailParam,
  validatePasswordResetEmail,
  validateResetUserPassword,
} = require("../validators/user-validator");
const {
  verifyUser,
  verifyAdminUser,
  verifyOwnerOrAdmin,
} = require("../middleware/verify-firebase-token");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateCreateUser,
  runValidation,
  userRoleController.createUser
);

router.post(
  "/google-auth",
  validateCreateGoogleUser,
  userRoleController.createGoogleUser
);

router.get(
  "/",
  validateGetUsers,
  runValidation,
  verifyAdminUser,
  userRoleController.getUsers
);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  verifyOwnerOrAdmin,
  userRoleController.getUserById
);

router.get(
  "/uid/:uid",
  validateUidParam,
  runValidation,
  verifyUser,
  userRoleController.getUserByUid
);

router.patch(
  "/:id",
  multer.single("avatar"),
  validateIdParam,
  validateUpdateUser,
  runValidation,
  verifyOwnerOrAdmin,
  userRoleController.updateUser
);

router.post(
  "/reset-password",
  validatePasswordResetEmail,
  runValidation,
  userRoleController.sendPasswordResetEmail
);

router.patch(
  "/reset-password/:email",
  validateEmailParam,
  validateResetUserPassword,
  runValidation,
  verifyUser,
  userRoleController.resetUserPassword
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  verifyAdminUser,
  userRoleController.deleteUser
);

module.exports = router;
