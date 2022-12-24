import axios from 'axios';
import helpers from './helpers.js';

var url = `http://localhost:${process.env.PORT}/tickers/`;

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
      var results = helpers.parseData(date, data.results);

      var chunks = [];
      var chunk = [];

      results.map(function(result, i) {
        if (i === results.length - 1) {
          axios.post(url, chunk)
            .then(function() {
              console.log('Posted ' + i + ' tickers.');
            })
        } else if (chunk.length < 50) {
          chunk.push(result);
        } else {
          axios.post(url, chunk)
            .then(function() {
              console.log('Posted chunk.');
            })

          chunk = [result];
        }
      })
    };
  },

  getTicker: function(ticker) {
    var filter = {
      ticker: ticker
    };

    axios.get(url, {params: filter})
      .then(function(results) {
        console.log(results)
        console.log('test in getTicker')
      })
  }
};

export default ax;