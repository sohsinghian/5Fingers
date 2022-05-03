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
      expiresIn: "1800s",
    });
    res.json({
      status: "ok",
      message: "user logged in",
      accessToken: token,
      user: user.rows,
    });
  } else {
    res.status(401).json(usernameOrPasswordError);
  }
});

// usersRouter.get("/logout", (req, res) => {
//   res.json({ status: "ok", message: "logged out" });
// });

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

usersRouter.put("/edit", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    const updatedUser = await pool.query(
      `UPDATE users
      SET name=$1, gender=$2, dateOfBirth=$3, contact=$4, address=$5, postalCode=$6, email=$7, password=$8
      WHERE email=$9`,
      [
        req.body.name,
        req.body.gender,
        req.body.dateOfBirth,
        req.body.contactNum,
        req.body.unitNumber,
        req.body.postalCode,
        req.body.newEmail,
        req.body.password,
        req.body.currentEmail,
      ]
    );
    if (updatedUser.rowCount === 1) {
      res.json({ status: "ok", message: "user updated" });
    } else {
      res.json({ status: "error", message: "problems with updating user" });
    }
  } catch (error) {
    res.json({ status: "error", message: "connection error" });
  }
});

usersRouter.delete("/remove", async (req, res) => {
  try {
    const { email, password, token } = req.body;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken.email === email) {
      const deletedUser = await pool.query(
        "DELETE FROM users WHERE email=$1 AND password=$2",
        [email, password]
      );
      if (deletedUser.rowCount === 1) {
        res.json({ status: "ok", message: "user deleted" });
      } else {
        res.json({ status: "error", message: "problems with deleting user" });
      }
    }
  } catch {
    res.json({ status: "error", message: "connection error" });
  }
});

module.exports = usersRouter;
