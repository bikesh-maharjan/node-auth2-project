const express = require("express");

const server = express();

server.use(express.json());

server.use("/api", usersRouter);

server.use("/api/auth", authRouter);

module.exports = server;
