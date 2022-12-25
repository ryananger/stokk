const express = require('express');
const cors = require('cors');
const path = require('path');
const controller = require('./controller.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/tickers', function(req, res) {
  controller.postTickers(req, res);
});

app.get('/tickers/', function(req, res) {
  var query = req.query.filter;
  var sort = req.query.sort;
  var filter = {};

  for (var key in query) {
    switch (key) {
      case 'date':
      case 'ticker':
        filter[key] = query[key];
        break;
      default:
        filter[key] = controller.numQuery(query[key]);
        break;
    }
  }

  controller.findTickers(filter, sort, res);
});

const PORT = 4001;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
