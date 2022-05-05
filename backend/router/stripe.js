const express = require("express");
const stripeRouter = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

stripeRouter.post("/payment", async (req, res) => {
  let cart = req.body.cart;
  let subTotal = req.body.subTotal;
  console.log(cart);

  if (subTotal < 50) {
    cart.push({ name: "Delivery Fee", price: 4, quantity: 1 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "grabpay", "paynow"],
      mode: "payment",
      line_items: cart.map((item) => {
        return {
          price_data: {
            currency: "sgd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/payment-success`,
      cancel_url: `http://localhost:3000`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
  }
});

module.exports = stripeRouter;
