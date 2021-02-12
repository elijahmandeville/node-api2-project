const express = require("express");
const posts = require("./data/db");
const server = express();
const welcomeRouter = require("./posts/welcome-router");
const postsRouter = require("./posts/posts-router");
const cors = require("cors");

const port = process.env.PORT || 4000;

server.use(express.json());
server.use(cors());
server.use("/", welcomeRouter);
server.use("/posts", postsRouter);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
