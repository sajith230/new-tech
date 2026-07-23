const Product = require("../models/product");
const Statistics = require("../models/statistics");

const {
  uploadProductImages,
  updateProductImages,
  deleteProductImages,
} = require("../utils/s3");

exports.createProduct = async (req, res) => {
  try {
    const files = req.files;
    const {
      title,
      smallDescription,
      description,
      price,
      discountPrice,
      quantity,
      categories,
      attributes,
      isFeatured,
      status,
    } = req.body;

    const productImages = await uploadProductImages(title, files);
    const product = new Product({
      title,
      smallDescription,
      description,
      price,
      discountPrice,
      quantity,
      categories,
      attributes,
      productImages,
      isFeatured,
      status,
    });
    await product.save();
    await Statistics.findOneAndUpdate(
      {},
      { $inc: { totalProducts: 1 } },
      { new: true, runValidators: true }
    );

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const query = {};
    const { status, isFeatured } = req.query;
    if (status) query.status = status;
    if (isFeatured) query.isFeatured = isFeatured;

    const products = await Product.find(query)
      .populate("categories", "name description")
      .populate("attributes.attribute", "name variations");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categories", "name description")
      .populate("attributes.attribute", "name variations");
    if (!product)
      return res.status(404).json({
        message: "Product not found",
      });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({
        message: "Product not found",
      });

    const files = req.files;
    const {
      title,
      smallDescription,
      description,
      existingProductImages,
      price,
      discountPrice,
      quantity,
      categories,
      attributes,
      isFeatured,
      status,
    } = req.body;

    const productImages = await updateProductImages(
      product.productImages,
      existingProductImages,
      product.title,
      title,
      files
    );

    product.title = title;
    product.smallDescription = smallDescription;
    product.description = description;
    product.productImages = productImages;
    product.price = price;
    product.discountPrice = discountPrice;
    product.quantity = quantity;
    product.categories = categories;
    product.attributes = attributes;
    product.isFeatured = isFeatured;
    product.status = status;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({
        message: "Product not found",
      });

    await deleteProductImages(product.productImages);
    await product.deleteOne();
    await Statistics.findOneAndUpdate(
      {},
      { $inc: { totalProducts: -1 } },
      { new: true, runValidators: true }
    );

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
