const express = require("express");
const foodRouter = express.Router();
const pool = require("../database/database.js");

foodRouter.get("/all", async (req, res) => {
  try {
    const food = await pool.query("SELECT * FROM food");
    res.status(200).json(food.rows);
  } catch (error) {
    res.json({ status: "error", message: "connection error" });
  }
});

foodRouter.get("/fries", async (req, res) => {
  try {
    const fries = await pool.query("SELECT * FROM food WHERE type='fries'");
    res.status(200).json(fries.rows);
  } catch (error) {
    res.json({ status: "error", message: "connection error" });
  }
});

foodRouter.get("/chicken", async (req, res) => {
  try {
    const chicken = await pool.query("SELECT * FROM food WHERE type='chicken'");
    res.status(200).json(chicken.rows);
  } catch (error) {
    res.json({ status: "error", message: "connection error" });
  }
});

foodRouter.get("/beverages", async (req, res) => {
  try {
    const beverages = await pool.query(
      "SELECT * FROM food WHERE type='beverages'"
    );
    res.status(200).json(beverages.rows);
  } catch (error) {
    res.json({ status: "error", message: "connection error" });
  }
});

module.exports = foodRouter;
