const express = require("express");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
const pool = require("../database/database.js");
const jwt = require("jsonwebtoken");
// const randtoken = require("rand-token");

const usernameOrPasswordError = {
  status: "error",
  message: "username or password error",
};

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

  if (user === null) {
    console.log("user null");
    return res.status(401).send(usernameOrPasswordError);
  }

  const result = await bcrypt.compare(password, user.rows[0].password);
  if (result) {
    const token = jwt.sign({ email: email }, process.env.SECRET, {
      expiresIn: "300s",
    });
    // const decodedToken = jwt.verify(token, process.env.SECRET);
    res.json({ status: "ok", message: "user logged in", accessToken: token });
  } else {
    res.status(401).json(usernameOrPasswordError);
  }
});

usersRouter.get("/logout", (req, res) => {
  res.json({ status: "ok", message: "logged out" });
});

usersRouter.post("/create", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const createdUser = await pool.query(
      `INSERT INTO users (name, gender, dateOfBirth, contact, address, postalCode, email, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        req.body.name,
        req.body.gender,
        req.body.dateOfBirth,
        req.body.contactNum,
        req.body.unitNumber,
        req.body.postalCode,
        req.body.email,
        req.body.password,
      ]
    );
    console.log("created user is: ", createdUser);
    res.json({ status: "ok", message: "user created" });
  } catch (error) {
    res.status(401).json(usernameOrPasswordError);
  }
});

module.exports = usersRouter;
