/* eslint-disable no-console */
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'acerslee',
  password: 'password',
  host: 'localhost',
  database: 'blueocean',
  port: 5432,
})

module.exports = pool;