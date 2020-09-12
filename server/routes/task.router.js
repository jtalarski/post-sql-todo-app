const express = require('express');
const taskRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const Pool = pg.Pool;

const pool = new Pool({
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
});

// GET
taskRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then(result => {
            // Sends back the results in an object
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error getting tasks', error);
            res.sendStatus(500);
        });
});


taskRouter.post('/', (req, res) => {
    console.log('inrouter post');
    let newTask = req.body;
    console.log('Adding task', newTask);
    let queryText = `INSERT INTO "tasks" ("task") VALUES ($1);`;
    pool.query(queryText, [newTask.task]).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error adding new task', error);
        res.sendStatus(500);
    });
});

module.exports = taskRouter;