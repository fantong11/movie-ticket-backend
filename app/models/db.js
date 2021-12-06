const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT
});

// open the MySQL connection
connection.connect(error => {
  console.log(dbConfig.HOST);
  console.log(dbConfig.USER);
  console.log(dbConfig.PASSWORD);
  console.log(dbConfig.DB);
  console.log(dbConfig.PORT);
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;