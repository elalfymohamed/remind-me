const express = require("express");
const cors = require("cors");

const usersRouter = require("./router/users.js");
const todoRouter = require("./router/todo");

exports.endpoints = async (app) => {
  app.use((req, res, next) => {
    const origin = req.headers.origin;

    res.set("Access-Control-Allow-Origin", origin);
    res.set(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Credentials", true);
    return next();
  });

  app.use(express.json());
  app.use(cors());

  app.use("/auth", usersRouter);
  app.use("/todo", todoRouter);
};
