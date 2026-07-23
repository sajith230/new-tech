const Order = require("../models/order");

const { generateOrderId } = require("../utils/nanoid");
const {
  sendOrderConfirmationMail,
  sendPaymentPendingMail,
  sendPaymentReceivedMail,
  sendOrderProcessingMail,
  sendOrderShippedMail,
  sendOrderDeliveredMail,
  sendOrderCancelledMail,
} = require("../utils/brevo");
const { onCreateOrder, onDeleteOrder } = require("../utils/statistics");

exports.createOrder = async (req, res) => {
  try {
    const {
      products,
      subTotal,
      discountAmount,
      shippingCost,
      grandTotal,
      user,
      shippingInfo,
      billingInfo,
      paymentMethod,
      status,
    } = req.body;

    let shortId;
    let isUnique = false;
    let order;

    while (!isUnique) {
      try {
        shortId = generateOrderId();
        order = new Order({
          shortId,
          products,
          subTotal,
          discountAmount,
          shippingCost,
          grandTotal,
          user,
          shippingInfo,
          billingInfo,
          paymentMethod,
          status,
        });

        await order.save();
        if (status !== "cancelled") onCreateOrder(products, grandTotal);
        isUnique = true;
      } catch (err) {
        if (err.code !== 11000) throw err;
      }
    }

    await order.populate("products.product");
    await order.populate("products.attributes.attribute");
    sendOrderConfirmationMail(order.toObject());

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("products.product")
      .populate("products.attributes.attribute");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("products.product")
      .populate("products.attributes.attribute");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ user: id })
      .populate("products.product")
      .populate("products.attributes.attribute");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      shortId,
      products,
      subTotal,
      discountAmount,
      shippingCost,
      grandTotal,
      user,
      shippingInfo,
      paymentMethod,
      billingInfo,
      status,
    } = req.body;

    const existingOrder = await Order.findById(id).populate("products.product");
    if (!existingOrder)
      return res.status(404).json({ message: "Order not found" });

    const order = await Order.findByIdAndUpdate(
      id,
      {
        shortId,
        products,
        subTotal,
        discountAmount,
        shippingCost,
        grandTotal,
        user,
        shippingInfo,
        paymentMethod,
        billingInfo,
        status,
      },
      { new: true, runValidators: true }
    );
    if (existingOrder.status === status) return res.status(200).json(order);

    if (existingOrder.status === "cancelled")
      onCreateOrder(existingOrder.products, existingOrder.grandTotal);
    else if (status === "cancelled")
      onDeleteOrder(
        existingOrder.products,
        existingOrder.createdAt,
        existingOrder.grandTotal
      );

    await order.populate("products.product");
    await order.populate("products.attributes.attribute");
    switch (status) {
      case "pending-payment":
        sendPaymentPendingMail(order.toObject());
        break;
      case "paid":
        sendPaymentReceivedMail(order.toObject());
        break;
      case "processing":
        sendOrderProcessingMail(order.toObject());
        break;
      case "shipped":
        sendOrderShippedMail(order.toObject());
        break;
      case "completed":
        sendOrderDeliveredMail(order.toObject());
        break;
      case "cancelled":
        sendOrderCancelledMail(order.toObject());
        break;
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingOrder = await Order.findById(id);
    if (!existingOrder)
      return res.status(404).json({ message: "Order not found" });

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (existingOrder.status === status) return res.status(200).json(order);

    if (existingOrder.status === "cancelled")
      onCreateOrder(existingOrder.products, existingOrder.grandTotal);
    else if (status === "cancelled")
      onDeleteOrder(
        existingOrder.products,
        existingOrder.createdAt,
        existingOrder.grandTotal
      );

    await order.populate("products.product");
    await order.populate("products.attributes.attribute");
    switch (status) {
      case "pending-payment":
        sendPaymentPendingMail(order.toObject());
        break;
      case "paid":
        sendPaymentReceivedMail(order.toObject());
        break;
      case "processing":
        sendOrderProcessingMail(order.toObject());
        break;
      case "shipped":
        sendOrderShippedMail(order.toObject());
        break;
      case "completed":
        sendOrderDeliveredMail(order.toObject());
        break;
      case "cancelled":
        sendOrderCancelledMail(order.toObject());
        break;
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "cancelled")
      onDeleteOrder(order.products, order.createdAt, order.grandTotal);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
