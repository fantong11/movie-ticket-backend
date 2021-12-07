const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: ['http://localhost:8080'],
}))

app.use("/api", require("./app/routes/auth.routes.js"));
app.use("/api", require("./app/routes/user.routes.js"));
app.use("/api", require("./app/routes/movie.routes.js"));
app.use("/api", require("./app/routes/theater.routes.js"));
app.use("/api", require("./app/routes/showing.routes.js"));
app.use("/api", require("./app/routes/seat.routes.js"));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});