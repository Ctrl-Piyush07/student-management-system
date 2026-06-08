const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student_management",
  password: "piyush0705",
  port: 5432,
});

module.exports = pool;
