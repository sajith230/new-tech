const mongoose = require("mongoose");

const topProductsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      trim: true,
    },
    purchasedTimes: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const monthlyEarningsSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },
    earnings: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const StatisticsSchema = new mongoose.Schema(
  {
    totalProducts: {
      type: Number,
      min: 0,
      default: 0,
    },
    totalCustomers: {
      type: Number,
      min: 0,
      default: 0,
    },
    totalOrders: {
      type: Number,
      min: 0,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      min: 0,
      default: 0,
    },
    topProducts: [topProductsSchema],
    monthlyEarnings: [monthlyEarningsSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Statistics", StatisticsSchema);
