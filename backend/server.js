const express = require("express");
const cors = require("cors");
const users = require("./router/users");
const food = require("./router/food");
const cart = require("./router/cart");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);
app.use("/food", food);
app.use("/cart", cart);

app.get("/", (req, res) => {
  res.send("HappEats working");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
