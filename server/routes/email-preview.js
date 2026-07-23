const fs = require("fs");
const path = require("path");

const express = require("express");
const ejs = require("ejs");

const router = express.Router();
const emailsFolder = path.join(__dirname, "..", "emails");

const order = {
  shippingInfo: {
    firstName: "Dominic",
    lastName: "Brian",
    phoneNo: "0761525017",
    email: "dominic91960@gmail.com",
    address: "417, Seminary Gardens, Ampitiya",
    city: "Kandy",
    state: "Central",
    zipCode: "20160",
    apartment: "",
  },
  billingInfo: {
    firstName: "Dominic",
    lastName: "Brian",
    phoneNo: "0761525017",
    email: "dominic91960@gmail.com",
    address: "417, Seminary Gardens, Ampitiya",
    city: "Kandy",
    state: "Central",
    zipCode: "20160",
    apartment: "",
  },
  _id: "68ff2c0cd67fe64808cfdc45",
  shortId: "#MVUXKH",
  products: [
    {
      product: {
        _id: "68ff2baed67fe64808cfdc1a",
        title: "White T-Shirt",
        smallDescription: "White T-Shirt",
        description: "White T-Shirt",
        productImages: [
          "https://techcd.s3.ap-south-1.amazonaws.com/products/WHITE_TSHIRT_46F8B3/IMG_AXUN3CMVFE.png",
          "https://techcd.s3.ap-south-1.amazonaws.com/products/WHITE_TSHIRT_46F8B3/IMG_66HZ6PX226.png",
        ],
        price: 4500,
        discountPrice: 4000,
        quantity: 40,
        categories: ["68b70c1365113377c1a96619"],
        attributes: [
          {
            attribute: "68dcaf09f9b17fa4d11037b1",
            selectedVariations: ["XS", "S", "M", "L", "XL", "XXL"],
          },
        ],
        isFeatured: true,
        status: "public",
      },
      attributes: [
        {
          attribute: {
            _id: "68dcaf09f9b17fa4d11037b1",
            name: "Size",
            variations: ["XS", "S", "M", "L", "XL", "XXL"],
          },
          selectedVariation: "XS",
        },
      ],
      orderQuantity: 1,
      totalPrice: 4000,
    },
    {
      product: {
        _id: "68ff2baed67fe64808cfdc1a",
        title: "White T-Shirt",
        smallDescription: "White T-Shirt",
        description: "White T-Shirt",
        productImages: [
          "https://techcd.s3.ap-south-1.amazonaws.com/products/WHITE_TSHIRT_46F8B3/IMG_AXUN3CMVFE.png",
          "https://techcd.s3.ap-south-1.amazonaws.com/products/WHITE_TSHIRT_46F8B3/IMG_66HZ6PX226.png",
        ],
        price: 4500,
        discountPrice: 4000,
        quantity: 40,
        categories: ["68b70c1365113377c1a96619"],
        attributes: [
          {
            attribute: "68dcaf09f9b17fa4d11037b1",
            selectedVariations: ["XS", "S", "M", "L", "XL", "XXL"],
          },
        ],
        isFeatured: true,
        status: "public",
      },
      attributes: [
        {
          attribute: {
            _id: "68dcaf09f9b17fa4d11037b1",
            name: "Size",
            variations: ["XS", "S", "M", "L", "XL", "XXL"],
          },
          selectedVariation: "L",
        },
      ],
      orderQuantity: 1,
      totalPrice: 4000,
    },
    {
      product: {
        _id: "68ff2baed67fe64808cfdc1a",
        title: "White T-Shirt",
        smallDescription: "White T-Shirt",
        description: "White T-Shirt",
        productImages: [
          "https://techcd.s3.ap-south-1.amazonaws.com/products/WHITE_TSHIRT_46F8B3/IMG_AXUN3CMVFE.png",
          "https://techcd.s3.ap-south-1.amazonaws.com/products/WHITE_TSHIRT_46F8B3/IMG_66HZ6PX226.png",
        ],
        price: 4500,
        discountPrice: 4000,
        quantity: 40,
        categories: ["68b70c1365113377c1a96619"],
        attributes: [
          {
            attribute: "68dcaf09f9b17fa4d11037b1",
            selectedVariations: ["XS", "S", "M", "L", "XL", "XXL"],
          },
        ],
        isFeatured: true,
        status: "public",
      },
      attributes: [
        {
          attribute: {
            _id: "68dcaf09f9b17fa4d11037b1",
            name: "Size",
            variations: ["XS", "S", "M", "L", "XL", "XXL"],
          },
          selectedVariation: "XXL",
        },
      ],
      orderQuantity: 2,
      totalPrice: 8000,
    },
  ],
  subTotal: 16000,
  discountAmount: 0,
  shippingCost: 0,
  grandTotal: 16000,
  user: "68f4cde3cb978ac861698abe",
  paymentMethod: "card-payment",
  status: "pending-payment",
};

router.get("/contact/user", (req, res) => {
  try {
    const templatePath = path.join(emailsFolder, "contact", "user.ejs");
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, {
      name: "John Doe",
      email: "johndoe@domain.com",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, id. Impedit, nostrum minima, ex nobis tempora doloribus corrupti distinctio error tempore eum atque nulla voluptates qui ipsam recusandae modi quos?",
    });

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/contact/admin", (req, res) => {
  try {
    const templatePath = path.join(emailsFolder, "contact", "admin.ejs");
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, {
      name: "John Doe",
      email: "johndoe@domain.com",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, id. Impedit, nostrum minima, ex nobis tempora doloribus corrupti distinctio error tempore eum atque nulla voluptates qui ipsam recusandae modi quos?",
    });

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/password-reset/user", (req, res) => {
  try {
    const templatePath = path.join(emailsFolder, "password-reset", "user.ejs");
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, {
      firstName: "John",
      resetLink:
        "https://techcd.dominic91960.me/password-reset?mode=resetPassword&oobCode=_JewUqwxhg7-kWgwk8h5MdqXdMuQVmswXdGh_j8wcIMAAAGaJUY39w&apiKey=AIzaSyDhaZWivmWRdIE4I1jkMWV7ESnUTD0XhPA&continueUrl=https%3A%2F%2Ftechcd.dominic91960.me%2Fpassword-reset&lang=en",
    });

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/order-confirmation/user", (req, res) => {
  try {
    const templatePath = path.join(
      emailsFolder,
      "order-confirmation",
      "user.ejs"
    );
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, order);

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/order-confirmation/admin", (req, res) => {
  try {
    const templatePath = path.join(
      emailsFolder,
      "order-confirmation",
      "admin.ejs"
    );
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, order);

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/payment-pending/user", (req, res) => {
  try {
    const templatePath = path.join(emailsFolder, "payment-pending", "user.ejs");
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, order);

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/payment-received/user", (req, res) => {
  try {
    const templatePath = path.join(
      emailsFolder,
      "payment-received",
      "user.ejs"
    );
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, order);

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/order-processing/user", (req, res) => {
  try {
    const templatePath = path.join(
      emailsFolder,
      "order-processing",
      "user.ejs"
    );
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, order);

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/order-shipped/user", (req, res) => {
  try {
    const templatePath = path.join(emailsFolder, "order-shipped", "user.ejs");
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, order);

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/order-delivered/user", (req, res) => {
  try {
    const templatePath = path.join(emailsFolder, "order-delivered", "user.ejs");
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, order);

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/order-cancelled/user", (req, res) => {
  try {
    const templatePath = path.join(emailsFolder, "order-cancelled", "user.ejs");
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, order);

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
