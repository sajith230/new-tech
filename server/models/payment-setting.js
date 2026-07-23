const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema({
  accountHolderName: {
    type: String,
    required: true,
    trim: true,
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true,
  },
  bankName: {
    type: String,
    required: true,
    trim: true,
  },
  branchName: {
    type: String,
    required: true,
    trim: true,
  },
});

const paymentSettingSchema = new mongoose.Schema(
  {
    bankTransfer: {
      enabled: { type: Boolean, default: false },
      availableAccounts: {
        type: [bankAccountSchema],
        default: [],
      },
    },
    cod: {
      enabled: { type: Boolean, default: false },
      title: { type: String, default: "Cash on Delivery" },
      description: { type: String, default: "" },
    },
    cardPayment: {
      enabled: { type: Boolean, default: true },
    },
    shippingFee: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PaymentSetting",
  paymentSettingSchema,
  "payment_settings"
);
