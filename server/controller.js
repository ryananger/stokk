const Ticker = require('./db.js');

const controller = {
  postTickers: function(req, res) {
    Ticker.find({date: req.body[0].date})
      .then(function(results) {
        if (results.length === 0) {
          Ticker.insertMany(req.body);
          res.send({posted: true, message: 'Posted.'});
        } else {
          res.send({posted: false, message: 'Already in database.'});
        }
      })
  },
  findTickers: function(req, res) {
    Ticker.find(req.query)
      .sort({date: -1})
      .then(function(tickers) {
        var sendBody = [];

        tickers.map(function(ticker) {
          sendBody.push(ticker.toObject());
        });

        res.json(sendBody);
      })
  }
};

module.exports = controller;