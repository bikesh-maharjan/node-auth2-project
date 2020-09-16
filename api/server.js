const express = require("express");
const helmet = require("helmet");

const usersRouter = require("../users/usersRouter");
const authRouter = require("../auth/authRouter");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api", usersRouter);

server.use("/api/auth", authRouter);

module.exports = server;
