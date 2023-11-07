const express = require("express");

const app = express();

const user_routes = require("./controllers/user_routes");
const thought_routes = require("./controllers/thought_routes.js");
const reaction_routes = require("./controllers/reaction_routes.js");

const PORT = 3333;

// Import db connection
const db = require("./config/connection");

// Allow json to be sent by client
app.use(express.json());

app.use("/", [user_routes, thought_routes, reaction_routes]);

app.get("*", (req, res) => {
  res.status(404).send({
    message: "That route is incorrect",
    error: 404,
  });
});

db.on("open", () => {
  console.log("db connected");
  // Start the server
  app.listen(PORT, () => console.log("Server started on %s", PORT));
});
