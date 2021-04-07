const Pool = require("pg").Pool;
require("dotenv").config("../.env");

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_ENDPOINT,
  port: process.env.DB_PORT,
});

module.exports = { pool };
