const express = require('express');
const cors = require('cors');
const path = require('path');
const Ticker = require('./db.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/tickers', function(req, res) {
  Ticker.find({date: req.body[0].date})
    .then(function(results) {
      if (results.length === 0) {
        Ticker.insertMany(req.body);
        res.send({posted: true, message: 'Posted.'});
      } else {
        res.send({posted: false, message: 'Already in database.'});
      }
    })
});

app.get('/tickers/', function(req, res) {
  console.log(req.query);
  Ticker.find(req.query)
    .then(function(tickers) {
      var sendBody = [];

      tickers.map(function(ticker) {
        sendBody.push(ticker.toObject());
      });

      res.json(sendBody);
    })
});

const PORT = 4001;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
