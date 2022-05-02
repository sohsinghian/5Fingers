const express = require("express");
const cartRouter = express.Router();
const pool = require("../database/database.js");
const jwt = require("jsonwebtoken");

cartRouter.post("/add", async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET);

    const foodId = await pool.query(
      `SELECT foodId FROM cartItems
      WHERE foodId=$1`,
      [req.body.foodId]
    );

    if (foodId.rowCount === 0) {
      const cartItem = await pool.query(
        `INSERT INTO cartItems (userEmail, foodId, quantity)
        VALUES ($1, $2, $3)`,
        [decodedToken.email, req.body.foodId, req.body.quantity]
      );
      console.log("cart item added is: ", cartItem);
      res.json({ status: "ok", message: "added to cart" });
    } else {
      const currentQuantity = await pool.query(
        `SELECT quantity FROM cartItems
            WHERE foodId=$1`,
        [req.body.foodId]
      );
      const updated = currentQuantity.rows[0].quantity + 1;

      const updateQuantity = await pool.query(
        `UPDATE cartItems
        SET quantity=$1
        WHERE foodId=$2`,
        [updated, req.body.foodId]
      );
      res.json({ status: "ok", message: "quantity updated" });
    }
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
