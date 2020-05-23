require("dotenv").config();

// Setup express.
const express = require("express");
const app = express();

// Load our database models.
const db = require("./models/db.js");

// Load our routes.
const routes = require("./routes");

// Mount routes.
routes(app);

// Synchronize database and then start listening.
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, (err) => {
    if(err) throw err;
    console.log(`> Listening on http://localhost:${process.env.PORT}`);
  });
});
