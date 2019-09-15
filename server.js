const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const dailyupdate = require('./controllers/dailyupdate');
const dailygraph = require('./controllers/dailygraph');
const averagegraph = require('./controllers/averagegraph');
const signin = require('./controllers/signin');

const app = express(); // So we can have a server going

app.use(bodyParser.json()); // So we can get form data
app.use(cors()); // To connect front and back end

// Our DB
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

app.post('/dailyupdate', (req, res) => { dailyupdate.updateData(req, res, db) });

app.post('/dailygraph', (req, res) => { dailygraph.getGraphData(req, res, db) });

app.post('/averagegraph', (req, res) => { averagegraph.getGraphData(req, res, db) });

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

app.listen(process.env.PORT)