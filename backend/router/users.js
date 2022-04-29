const express = require("express");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
const pool = require("../database/database.js");

usersRouter.get("/users", async (request, response) => {
  const data = await pool.query("SELECT * FROM food WHERE name='Cheese Fries'");
  response.status(200).json(data.rows);
});

module.exports = usersRouter;
