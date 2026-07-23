const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ quiet: true });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

const contactRoutes = require("./routes/contact");
const userRoleRoutes = require("./routes/user-role");
const userRoutes = require("./routes/user");
const attributeRoutes = require("./routes/attribute");
const productCategoryRoutes = require("./routes/product-category");
const productRoutes = require("./routes/product");
const couponRoutes = require("./routes/coupon");
const paymentSettingRoutes = require("./routes/payment-setting");
const orderRoutes = require("./routes/order");
const statisticsRoutes = require("./routes/statistics");
// const emailPreviewRoutes = require("./routes/email-preview");

app.use("/contact", contactRoutes);
app.use("/user-role", userRoleRoutes);
app.use("/user", userRoutes);
app.use("/attribute", attributeRoutes);
app.use("/product-category", productCategoryRoutes);
app.use("/product", productRoutes);
app.use("/coupon", couponRoutes);
app.use("/payment", paymentSettingRoutes);
app.use("/order", orderRoutes);
app.use("/statistics", statisticsRoutes);
// app.use("/email-preview", emailPreviewRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found!" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const server = app.listen(process.env.PORT, () =>
      console.log("Listening on port ", process.env.PORT)
    );
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
