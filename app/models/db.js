const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USERNAME,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
  port: dbConfig.PORT
});

// open the MySQL connection
connection.connect(error => {
  console.log(dbConfig.HOST + " 70986543678908765436");

  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;