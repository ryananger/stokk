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
      var results = helpers.parseData(date, data.results);

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