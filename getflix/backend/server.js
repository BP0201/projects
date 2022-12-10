"use strict";

const { PORT } = require("./config");

const app = require('./app');

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
});