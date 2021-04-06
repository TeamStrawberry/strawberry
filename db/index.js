/* eslint-disable no-console */
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'danielko',
  password: '',
  host: 'localhost',
  database: 'blueocean',
  port: 5432,
})

module.exports = pool;