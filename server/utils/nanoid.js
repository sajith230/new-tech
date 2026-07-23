const { customAlphabet } = require("nanoid");

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateOrderId = () => {
  const nanoid = customAlphabet(alphabet, 6);
  return "#" + nanoid();
};

const generateSubfolderId = () => {
  const nanoid = customAlphabet(alphabet, 6);
  return "_" + nanoid();
};

const generateImageId = () => {
  const nanoid = customAlphabet(alphabet, 10);
  return "IMG_" + nanoid();
};

module.exports = { generateOrderId, generateSubfolderId, generateImageId };
