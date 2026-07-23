const { sendContactMail } = require("../utils/brevo");

exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const data = { name, email, message };
    sendContactMail(data);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
