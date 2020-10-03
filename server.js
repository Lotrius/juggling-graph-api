const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const dailyupdate = require('./controllers/dailyupdate');
const dailygraph = require('./controllers/dailygraph');
const averagegraph = require('./controllers/averagegraph');
const signin = require('./controllers/signin');
const deletedata = require('./controllers/deletedata');

const app = express(); // So we can have a server going

app.use(cors()); // To connect front and back end
app.use(bodyParser.json()); // So we can get form data

// Our DB
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

// const db = knex({
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1',
//     port: '5433',
//     user: 'postgres',
//     password: 'password',
//     database: 'juggling-chart'
//   }
// });

app.get('/', (req, res) => res.send('hi'));

// Get and validate sign in information
app.post('/signin', (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

// Insert new catches and date into DB
app.post('/dailyupdate', (req, res) => {
  dailyupdate.updateData(req, res, db);
});

// Get number of catches for a given day
app.post('/dailygraph', (req, res) => {
  dailygraph.getGraphData(req, res, db);
});

// Get average catches for each day
app.post('/averagegraph', (req, res) => {
  averagegraph.getGraphData(req, res, db);
});

// Delete latest entry in database
app.delete('/delete', (req, res) => {
  deletedata.handledelete(req, res, db);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
