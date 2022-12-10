"use strict";

const express = require("express");
const cors = require("cors");

const { authenticateJWT } = require("./middleware");
const { NotFoundError } = require("./expressError");

const morgan = require("morgan")
const app = express();

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const favoritesRoutes = require("./routes/favorites");


app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))
app.use(authenticateJWT);

/** Attaching all routes in the directory */
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/favorites", favoritesRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });

  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
      error: { message, status },
    });
  });

module.exports = app;