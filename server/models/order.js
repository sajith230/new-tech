const mongoose = require("mongoose");

const address = {
  firstName: {
    type: String,
    default: "",
    trim: true,
  },
  lastName: {
    type: String,
    default: "",
    trim: true,
  },
  phoneNo: {
    type: String,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    default: "",
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    default: "",
    trim: true,
  },
  apartment: {
    type: String,
    default: "",
    trim: true,
  },
  city: {
    type: String,
    default: "",
    trim: true,
  },
  state: {
    type: String,
    default: "",
    trim: true,
  },
  zipCode: {
    type: String,
    default: "",
    trim: true,
  },
};

const productAttributeSchema = new mongoose.Schema(
  {
    attribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
      required: true,
    },
    selectedVariation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    attributes: [productAttributeSchema],
    orderQuantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      unique: true,
      required: true,
    },
    products: [productSchema],
    subTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discountAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingCost: {
      type: Number,
      required: true,
      min: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingInfo: address,
    billingInfo: address,
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "pending-payment",
        "paid",
        "processing",
        "shipped",
        "completed",
        "cancelled",
      ],
      default: "pending-payment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
