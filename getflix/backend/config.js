"use strict";

// for fancy terminal
require("dotenv").config();
require("colors");

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "getflix_test"
        : process.env.DATABASE_URL || "getflix";
}

const PORT = +process.env.PORT || 3001;

const SECRET_KEY = process.env.SECRET_KEY || "very-secret-key";

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 13;

console.log("Configurations:");
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR:".yellow, BCRYPT_WORK_FACTOR.toString());
console.log("Database:".yellow, getDatabaseUri());
console.log("---".yellow);

module.exports = {
    getDatabaseUri,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    PORT
}
