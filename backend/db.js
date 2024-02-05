const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bookswap",
  password: "wordpass8",
  port: 5432,
});

module.exports = { pool };
