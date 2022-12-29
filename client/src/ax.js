import axios from 'axios';
import helpers from './helpers.js';

var urlBase = `http://localhost:${process.env.PORT}/`;

var ax = {
  polygonDataLoop: function(date, setDate, toggle) {
    var newDate = helpers.newDate(date);
    var dateString = document.cookie.slice(5);

    if (!newDate) {
      console.log('All dates found.');
      document.cookie = 'date=' + helpers.dateToString(date);
      toggle(false);
      return;
    }

    axios.get(helpers.getURL(dateString))
      .then(function(response) {
        ax.handleData(response.data, dateString);

        console.log('GET data for ', dateString, response.data.resultsCount);
        document.cookie = 'date=' + helpers.dateToString(newDate);

        setTimeout(function() {
          setDate(newDate);
        }, 20000);
      });
  },
  handleData: function(data, date) {
    if (data.resultsCount > 0) {
      var results = ax.parseData(date, data.results);

      var chunks = [];
      var chunk  = [];

      results.map(function(result, i) {
        if (i === results.length - 1) {
          axios.post(urlBase + 'tickers', chunk)
            .then(function(response) {
              if (!response.data.posted) {
                console.log(response.data.message);
                return;
              }

              console.log('Posted ' + i + ' tickers.');
            })
        } else if (chunk.length < 50) {
          chunk.push(result);
        } else {
          axios.post(urlBase + 'tickers', chunk)
            .then(function(response) {
              if (!response.data.posted) {
                console.log(response.data.message);
                return;
              }

              console.log('Posted chunk.');
            })

          chunk = [result];
        }
      })
    };
  },
  parseData: function(date, data) {
    var parsed = [];

    data.map(function(entry, i) {
      var stock = {};

      stock.ticker = entry.T;
      stock.date   = date;

      stock.open   = entry.o;
      stock.close  = entry.c;
      stock.high   = entry.h;
      stock.low    = entry.l;

      stock.volume = entry.v;
      stock.vwap   = entry.vw;

      parsed.push(stock);
    })

    return parsed;
  },
  getTickers: function(filter, sortBy, setData, cb) {
    if (Object.keys(filter).length === 0) {
      alert('Request must not be empty.');
      return;
    }

    var sort = {
      [sortBy]: document.getElementById('order').value
    };

    axios.get(urlBase + 'tickers', {params: {filter, sort}})
      .then(function(response) {
        if (typeof response.data === 'string') {
          alert(response.data);
          return;
        }

        cb();
        setData(response.data);
      })
  },
  getNet: function(set) {
    axios.get(urlBase + 'net')
      .then(function(response) {
        console.clear();
        if (typeof response.data === 'string') {
          console.log(response.data);
          return;
        }

        var net = response.data;

        set(net);
      })
  }
};

export default ax;