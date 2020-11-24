const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/api", require("./app/routes/user.routes.js"));
app.use("/api", require("./app/routes/movie.routes.js"));

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});