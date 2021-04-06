const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'LukasSQL7381',
  host: 'localhost',
  port: 5432,
  database: 'blueocean'
});

module.exports = {pool};