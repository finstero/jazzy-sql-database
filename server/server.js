const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const pool = require('./modules/pool.js');

// const pg = require('pg');
// const Pool = pg.Pool;

// const pool = new Pool({
//     database: 'jazzy_sql',
//     host: 'localhost',
//     port: 5432
// });

// pool.on('connect', () =>{
//     console.log('CONNECTED TO POSTGRES');
// });

// pool.on('error', (error) => {
//     console.log(error);
// });


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

app.get('/artist', (req, res) => {
    console.log(`In /songs GET`);

    const queryText = `SELECT * FROM "artist" ORDER BY "birthdate" DESC;`
    // res.send(artistList);
    pool.query(queryText)
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch ( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
});


app.post('/artist', (req, res) => {
    // artistList.push(req.body);
    // res.sendStatus(201);
    let queryText = `INSERT INTO "artist" ("name", "birthdate")
    VALUES ($1, $2);`

    let values = [req.body.name, req.body.birthdate];

    pool.query(queryText, values)
    .then ( (result) => {
        res.sendStatus(201);
    }).catch ( err => {
        console.log(err);
        res.sendStatus(500);
    });

});



app.get('/song', (req, res) => {
    console.log(`In /songs GET`);

    const queryText = `SELECT * FROM "song" ORDER BY "title" ASC;`

    pool.query(queryText)
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch ( (err) => {
        console.log(err);
        res.sendStatus(500);
    })

});

app.post('/song', (req, res) => {

    let queryText = `INSERT INTO "song" ("title", "length", "released")
    VALUES ($1, $2, $3);`
    let values = [req.body.title, req.body.length, req.body.released];

    pool.query(queryText, values)
    .then( (result) => {
    res.sendStatus(201); 
    }).catch (err => {
        console.log(err);
        res.sendStatus(500);
    });

});


