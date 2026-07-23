const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const {
  validateOrder,
  validateUpdateOrderStatus,
  validateIdParam,
} = require("../validators/order-validator");
const { runValidation } = require("../middleware/validate");

router.post("/", validateOrder, runValidation, orderController.createOrder);

router.get("/", orderController.getOrders);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  orderController.getOrderById
);

router.get(
  "/user/:id",
  validateIdParam,
  runValidation,
  orderController.getOrderByUserId
);

router.patch(
  "/:id",
  validateIdParam,
  validateOrder,
  runValidation,
  orderController.updateOrder
);

router.patch(
  "/:id/status",
  validateIdParam,
  validateUpdateOrderStatus,
  runValidation,
  orderController.updateOrderStatus
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  orderController.deleteOrder
);

module.exports = router;
