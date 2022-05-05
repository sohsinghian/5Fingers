const express = require("express");
const cartRouter = express.Router();
const pool = require("../database/database.js");
const jwt = require("jsonwebtoken");

cartRouter.post("/add", async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET);

    const foodId = await pool.query(
      `SELECT foodId FROM cartItems
      WHERE foodId=$1 AND userEmail=$2`,
      [req.body.foodId, decodedToken.email]
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
            WHERE foodId=$1 AND userEmail=$2`,
        [req.body.foodId, decodedToken.email]
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

cartRouter.post("/all", async (req, res) => {
  const decodedToken = jwt.verify(req.body.token, process.env.SECRET);
  const email = decodedToken.email;
  try {
    const cart = await pool.query(
      `SELECT * FROM cartItems
        INNER JOIN food
        ON foodId = food.id
        WHERE userEmail=$1`,
      [email]
    );

    res.status(200).json(cart.rows);
  } catch (error) {
    res.json({ status: "error", message: "connection error" });
  }
});

cartRouter.post("/subTotal", async (req, res) => {
  const decodedToken = jwt.verify(req.body.token, process.env.SECRET);

  try {
    const priceAndQuantity = await pool.query(
      `SELECT price, quantity FROM cartItems
          INNER JOIN food
          ON foodId = food.id
          WHERE userEmail=$1`,
      [decodedToken.email]
    );
    let subTotal = 0;
    for (let i = 0; i < priceAndQuantity.rows.length; i++) {
      let price =
        priceAndQuantity.rows[i].price * priceAndQuantity.rows[i].quantity;
      subTotal += price;
    }

    res.status(200).json(subTotal.toFixed(2));
  } catch (error) {
    res.json({ status: "error", message: "connection error" });
  }
});

cartRouter.delete("/remove", async (req, res) => {
  try {
    const { foodId, token } = req.body;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken) {
      const deletedItem = await pool.query(
        `DELETE FROM cartItems
        WHERE foodId=$1 AND userEmail=$2`,
        [foodId, decodedToken.email]
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

cartRouter.post("/decrementQuantity", async (req, res) => {
  try {
    const { foodId, quantity, token } = req.body;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken) {
      const updated = Number(quantity) - 1;

      if (updated > 0) {
        const updateQuantity = await pool.query(
          `UPDATE cartItems
          SET quantity=$1
          WHERE foodId=$2 AND userEmail=$3`,
          [updated, foodId, decodedToken.email]
        );
      } else {
        const removeQuantity = await pool.query(
          `DELETE FROM cartItems
          WHERE foodId=$1 AND userEmail=$2`,
          [foodId, decodedToken.email]
        );
      }
      res.json({ status: "ok", message: "quantity updated" });
    }
  } catch (error) {
    res
      .status(401)
      .json({ status: "error", message: "problems with updating" });
  }
});

cartRouter.post("/incrementQuantity", async (req, res) => {
  try {
    const { foodId, quantity, token } = req.body;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken) {
      const updated = Number(quantity) + 1;

      const updateQuantity = await pool.query(
        `UPDATE cartItems
            SET quantity=$1
            WHERE foodId=$2 AND userEmail=$3`,
        [updated, foodId, decodedToken.email]
      );
      res.json({ status: "ok", message: "quantity updated" });
    }
  } catch (error) {
    res
      .status(401)
      .json({ status: "error", message: "problems with updating" });
  }
});

module.exports = cartRouter;
