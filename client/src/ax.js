import axios from 'axios';
import helpers from './helpers.js';

var url = 'http://localhost:4001/tickers/';

var ax = {
  polygonDataLoop: function(date, setDate) {
    var dateString = document.cookie.slice(5);

    console.log('GET data for ', dateString);

    axios.get(helpers.getURL(dateString))
      .then(function(response) {
        ax.handleData(response.data, dateString);

        var newDate = helpers.newDate(date);

        document.cookie = 'date=' + helpers.dateToString(newDate);

        if (!newDate) {
          console.log('All dates found.');
          return;
        }

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
  }
};

export default ax;