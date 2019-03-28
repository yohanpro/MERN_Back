const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const app = express();

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => {
    console.log("연결되었음");
  })
  .catch(e => console.log(e));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The server running on port ${port}`);
});
