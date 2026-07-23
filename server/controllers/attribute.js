const Attribute = require("../models/attribute");
const Product = require("../models/product");

exports.createAttribute = async (req, res) => {
  try {
    const { name, variations } = req.body;
    const attribute = new Attribute({ name, variations });
    await attribute.save();

    res.status(201).json(attribute);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating attribute", error: error.message });
  }
};

exports.getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find().sort({ createdAt: -1 });
    res.status(200).json(attributes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching attributes", error: error.message });
  }
};

exports.getAttributeById = async (req, res) => {
  try {
    const { id } = req.params;
    const attribute = await Attribute.findById(id);

    if (!attribute)
      return res.status(404).json({ message: "Attribute not found" });

    res.status(200).json(attribute);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching attribute", error: error.message });
  }
};

exports.updateAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, variations } = req.body;

    const attribute = await Attribute.findByIdAndUpdate(
      id,
      { name, variations },
      { new: true, runValidators: true }
    );

    if (!attribute)
      return res.status(404).json({ message: "Attribute not found" });

    res.status(200).json(attribute);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating attribute", error: error.message });
  }
};

// Check if attribute is being used by any products
exports.checkAttributeUsage = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if attribute exists
    const attribute = await Attribute.findById(id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }

    // Check if any products are using this attribute
    const productsUsingAttribute = await Product.find({
      "attributes.attribute": id
    });

    const isInUse = productsUsingAttribute.length > 0;
    const productCount = productsUsingAttribute.length;

    res.status(200).json({
      isInUse,
      productCount,
      products: isInUse ? productsUsingAttribute.map(p => ({
        id: p._id,
        title: p.title
      })) : []
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking attribute usage", error: error.message });
  }
};

// Check if a specific variation is being used by any products
exports.checkVariationUsage = async (req, res) => {
  try {
    const { id, variation } = req.params;
    
    // Check if attribute exists
    const attribute = await Attribute.findById(id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }

    // Check if any products are using this specific variation
    const productsUsingVariation = await Product.find({
      "attributes.attribute": id,
      "attributes.selectedVariations": variation
    });

    const isInUse = productsUsingVariation.length > 0;
    const productCount = productsUsingVariation.length;

    res.status(200).json({
      isInUse,
      productCount,
      products: isInUse ? productsUsingVariation.map(p => ({
        id: p._id,
        title: p.title
      })) : []
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking variation usage", error: error.message });
  }
};

exports.deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if attribute is being used by any products
    const productsUsingAttribute = await Product.find({
      "attributes.attribute": id
    });

    if (productsUsingAttribute.length > 0) {
      return res.status(400).json({ 
        message: "Cannot delete attribute. It is being used by products.",
        productCount: productsUsingAttribute.length,
        products: productsUsingAttribute.map(p => ({
          id: p._id,
          title: p.title
        }))
      });
    }

    const attribute = await Attribute.findByIdAndDelete(id);

    if (!attribute)
      return res.status(404).json({ message: "Attribute not found" });

    res.status(200).json({ message: "Attribute deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting attribute", error: error.message });
  }
};
