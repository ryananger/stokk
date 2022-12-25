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
  findTickers: function(filter, sort, res) {
    Ticker.find(filter)
      .sort(sort)
      .then(function(tickers) {
        if (tickers.length === 0) {
          res.send('No tickers found.');
          return;
        }

        var sendBody = [];

        tickers.map(function(ticker) {
          sendBody.push(ticker.toObject());
        });

        res.json(sendBody);
      })
  },

  numQuery: function(expression) {
    expression = expression.replaceAll(' ', '');
    var args = expression.split(',');
    var filter = {};

    args.map(function(arg) {
      var index = arg.search(/[0-9]/);
      if (index === 0) {
        filter = Number(arg);
      } else {
        var operator = arg.slice(0, index);

        switch (operator) {
          case '>':
            operator = '$gt';
            break;
          case '<':
            operator = '$lt';
            break;
          case '>=':
            operator = '$gte';
            break;
          case '<=':
            operator = '$lte';
            break;
        }

        var num = Number(arg.slice(index));

        filter[operator] = num;
      }
    })

    return filter;
  }
};

module.exports = controller;