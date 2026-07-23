const fs = require("fs");
const path = require("path");

const ejs = require("ejs");
const SibApiV3Sdk = require("@getbrevo/brevo");

const emailsFolder = path.join(__dirname, "..", "emails");
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;
const senderName = process.env.BREVO_SENDER_NAME;
const senderEmail = process.env.BREVO_SENDER_EMAIL;

const sendContactMail = async (data) => {
  const userTemplatePath = path.join(emailsFolder, "contact", "user.ejs");
  const adminTemplatePath = path.join(emailsFolder, "contact", "admin.ejs");

  const userTemplate = fs.readFileSync(userTemplatePath, "utf8");
  const adminTemplate = fs.readFileSync(adminTemplatePath, "utf8");

  const userMail = {
    subject: "TecHCD: We Received Your Message",
    htmlContent: ejs.render(userTemplate, data),
    sender: { name: senderName, email: senderEmail },
    to: [{ name: data.name, email: data.email }],
  };
  const adminMail = {
    subject: "TecHCD: New Contact Form Submission",
    htmlContent: ejs.render(adminTemplate, data),
    sender: { name: senderName, email: senderEmail },
    to: [{ name: "Admin", email: "techcdlk@gmail.com" }],
  };

  await apiInstance.sendTransacEmail(userMail);
  await apiInstance.sendTransacEmail(adminMail);
};

const sendPasswordResetMail = async (data) => {
  const userTemplatePath = path.join(
    emailsFolder,
    "password-reset",
    "user.ejs"
  );
  const userTemplate = fs.readFileSync(userTemplatePath, "utf8");
  const userMail = {
    subject: "TecHCD: Reset Your Password",
    htmlContent: ejs.render(userTemplate, data),
    sender: { name: senderName, email: senderEmail },
    to: [{ name: data.firstName, email: data.email }],
  };

  await apiInstance.sendTransacEmail(userMail);
};

const sendOrderConfirmationMail = async (order) => {
  const userTemplatePath = path.join(
    emailsFolder,
    "order-confirmation",
    "user.ejs"
  );
  const adminTemplatePath = path.join(
    emailsFolder,
    "order-confirmation",
    "admin.ejs"
  );

  const userTemplate = fs.readFileSync(userTemplatePath, "utf8");
  const adminTemplate = fs.readFileSync(adminTemplatePath, "utf8");

  const userMail = {
    subject: "TecHCD: Your Order Confirmation",
    htmlContent: ejs.render(userTemplate, order),
    sender: { name: senderName, email: senderEmail },
    to: [
      { name: order.shippingInfo.firstName, email: order.shippingInfo.email },
    ],
  };
  const adminMail = {
    subject: "TecHCD: New Order Received",
    htmlContent: ejs.render(adminTemplate, order),
    sender: { name: senderName, email: senderEmail },
    to: [{ name: "Admin", email: "techcdlk@gmail.com" }],
  };

  await apiInstance.sendTransacEmail(userMail);
  await apiInstance.sendTransacEmail(adminMail);
};

const sendPaymentPendingMail = async (order) => {
  const userTemplatePath = path.join(
    emailsFolder,
    "payment-pending",
    "user.ejs"
  );
  const userTemplate = fs.readFileSync(userTemplatePath, "utf8");
  const userMail = {
    subject: "TecHCD: Payment Pending",
    htmlContent: ejs.render(userTemplate, order),
    sender: { name: senderName, email: senderEmail },
    to: [
      { name: order.shippingInfo.firstName, email: order.shippingInfo.email },
    ],
  };

  await apiInstance.sendTransacEmail(userMail);
};

const sendPaymentReceivedMail = async (order) => {
  const userTemplatePath = path.join(
    emailsFolder,
    "payment-received",
    "user.ejs"
  );
  const userTemplate = fs.readFileSync(userTemplatePath, "utf8");
  const userMail = {
    subject: "TecHCD: Payment Received",
    htmlContent: ejs.render(userTemplate, order),
    sender: { name: senderName, email: senderEmail },
    to: [
      { name: order.shippingInfo.firstName, email: order.shippingInfo.email },
    ],
  };

  await apiInstance.sendTransacEmail(userMail);
};

const sendOrderProcessingMail = async (order) => {
  const userTemplatePath = path.join(
    emailsFolder,
    "order-processing",
    "user.ejs"
  );
  const userTemplate = fs.readFileSync(userTemplatePath, "utf8");
  const userMail = {
    subject: "TecHCD: Order Processing",
    htmlContent: ejs.render(userTemplate, order),
    sender: { name: senderName, email: senderEmail },
    to: [
      { name: order.shippingInfo.firstName, email: order.shippingInfo.email },
    ],
  };

  await apiInstance.sendTransacEmail(userMail);
};

const sendOrderShippedMail = async (order) => {
  const userTemplatePath = path.join(emailsFolder, "order-shipped", "user.ejs");
  const userTemplate = fs.readFileSync(userTemplatePath, "utf8");
  const userMail = {
    subject: "TecHCD: Order Shipped",
    htmlContent: ejs.render(userTemplate, order),
    sender: { name: senderName, email: senderEmail },
    to: [
      { name: order.shippingInfo.firstName, email: order.shippingInfo.email },
    ],
  };

  await apiInstance.sendTransacEmail(userMail);
};

const sendOrderDeliveredMail = async (order) => {
  const userTemplatePath = path.join(
    emailsFolder,
    "order-delivered",
    "user.ejs"
  );
  const userTemplate = fs.readFileSync(userTemplatePath, "utf8");
  const userMail = {
    subject: "TecHCD: Order Delivered",
    htmlContent: ejs.render(userTemplate, order),
    sender: { name: senderName, email: senderEmail },
    to: [
      { name: order.shippingInfo.firstName, email: order.shippingInfo.email },
    ],
  };

  await apiInstance.sendTransacEmail(userMail);
};

const sendOrderCancelledMail = async (order) => {
  const userTemplatePath = path.join(
    emailsFolder,
    "order-cancelled",
    "user.ejs"
  );
  const userTemplate = fs.readFileSync(userTemplatePath, "utf8");
  const userMail = {
    subject: "TecHCD: Order Cancelled",
    htmlContent: ejs.render(userTemplate, order),
    sender: { name: senderName, email: senderEmail },
    to: [
      { name: order.shippingInfo.firstName, email: order.shippingInfo.email },
    ],
  };

  await apiInstance.sendTransacEmail(userMail);
};

module.exports = {
  sendContactMail,
  sendPasswordResetMail,
  sendOrderConfirmationMail,
  sendPaymentPendingMail,
  sendPaymentReceivedMail,
  sendOrderProcessingMail,
  sendOrderShippedMail,
  sendOrderDeliveredMail,
  sendOrderCancelledMail,
};
