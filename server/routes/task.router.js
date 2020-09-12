const express = require('express');
const taskRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const Pool = pg.Pool;

const pool = new Pool({
    database: "koala_holla",
    host: "localhost",
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
});




module.exports = taskRouter;