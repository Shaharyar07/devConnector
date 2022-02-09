const express = require("express");
const connectToMongo = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

connectToMongo();

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Sup my nigga?"));
app.listen(port, () =>
  console.log(`Backend Server is running at port ${port}`)
);
