const Pool = require("pg").Pool;

const pool = new Pool({
  user: "he_user",
  host: "localhost",
  database: "happeats",
  password: process.env.PASSWORD,
  port: 5432,
});

module.exports = pool;
