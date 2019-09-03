const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const dailyupdate = require('./controllers/dailyupdate');
const dailygraph = require('./controllers/dailygraph');
const averagegraph = require('./controllers/averagegraph');

const app = express(); // So we can have a server going

app.use(bodyParser.json()); // So we can get form data
app.use(cors()); // To connect front and back end

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5433',
        user: 'postgres',
        password: 'FFFFFF',
        database: 'juggling-chart'
    }
});

app.post('/dailyupdate', (req, res) => { dailyupdate.updateData(req, res, db) });

app.post('/dailygraph', (req, res) => { dailygraph.getGraphData(req, res, db) });

app.get('/averagegraph', (req, res) => { averagegraph.getGraphData(req, res, db) });

app.listen(process.env.PORT || 3000, () => {
    console.log('working on port', process.env.PORT);
})