const express = require("express");
const cartRouter = express.Router();
const pool = require("../database/database.js");
const jwt = require("jsonwebtoken");

cartRouter.post("/add", async (req, res) => {
  try {
    const cartItem = await pool.query(
      `INSERT INTO cartItems (userEmail, foodId, quantity)
        VALUES ($1, $2, $3)`,
      [req.body.email, req.body.foodId, req.body.quantity]
    );
    console.log("cart item added is: ", cartItem);
    res.json({ status: "ok", message: "added to cart" });
  } catch (error) {
    res
      .status(401)
      .json({ status: "error", message: "problem with adding to cart" });
  }
});

cartRouter.get("/all", async (req, res) => {
  try {
    const cart = await pool.query(
      `SELECT * FROM cartItems
        INNER JOIN food
        ON foodId = id`
    );
    res.status(200).json(cart.rows);
  } catch (error) {
    res.json({ status: "error", message: "connection error" });
  }
});

cartRouter.delete("/remove", async (req, res) => {
  try {
    const { email, foodId, token } = req.body;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken.email === email) {
      const deletedItem = await pool.query(
        "DELETE FROM cartItems WHERE foodId=$1",
        [foodId]
      );
      if (deletedItem.rowCount === 1) {
        res.json({ status: "ok", message: "item deleted" });
      } else {
        res.json({ status: "error", message: "problems with deleting item" });
      }
    }
  } catch {
    res.json({ status: "error", message: "connection error" });
  }
});

module.exports = cartRouter;
