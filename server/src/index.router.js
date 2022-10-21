import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import usersRouter from "./router/users.js";

const CONNECTION_URL = process.env.CONNECTION_URL;
const PRIVET_KEY = process.env.PRIVET_KEY;
const NODE_ENV = process.env.NODE_ENV;

export const endpoints = async (app) => {
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
  app.use(cookieParser());

  app.enable("trust proxy");

  app.use(
    session({
      name: "s_id",
      secret: PRIVET_KEY,
      store: MongoStore.create({ mongoUrl: CONNECTION_URL }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days OR ONE WEEK
        sameSite: NODE_ENV == "dev" ? "" : "none",
        secure: NODE_ENV == "dev" ? false : true,
        httpOnly: false,
      },
    })
  );

  app.use("/auth", usersRouter);
};
