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
  Ticker.insertMany(req.body);

  res.send();
});

app.get('/tickers/:ticker', function(req, res) {

});

const PORT = process.env.PORT;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
