import helpers from '../../helpers.js';
import chroma from 'chroma-js';

var yellow = 'rgb(230, 195, 130)';

const getTickers = function(data) {
  let tickers = {};

  data.map(function(entry) {
    if (!tickers[entry.ticker]) {
      tickers[entry.ticker] = [];
    }

    tickers[entry.ticker].push(entry);
  })

  return tickers;
};

const getLabels = function(data) {
  let labels = [];

  data.map(function(entry) {
    let date  = entry.date;
    let month = Number(date.slice(5, 7));
    let day   = Number(date.slice(8));

    let label = [day, helpers.getMonthName(month)];

    if (labels.indexOf(label) === -1) {
      labels.push(label);
    }
  })

  return labels;
};

const getDataForType = function(type, tickers, labels) {
  var data = {
    labels,
    datasets: function() {
      var sets = [];

      var i = Object.keys(tickers).length - 1;
      for (var ticker in tickers) {
        sets.push({
          label: ticker,
          borderColor: function() {
            let h = chroma(yellow).get('hsl.h');
            let s = chroma(yellow).get('hsl.s');
            let l = chroma(yellow).get('hsl.l');

            let hInc = h + (i * 80);
            let nh = hInc < 360 ? hInc : hInc - 360;

            let color = chroma.hsl(nh, s, l).hex();

            return color;
          }(),
          data: prepData(type, ticker, tickers, labels)
        });

        i--;
      }

      return sets;
    }()
  };

  return data;
};

const prepData = function(type, set, tickers, labels) {
  const prepped = [];

  let tickerData = tickers[set];

  labels.map(function(label, i) {
    if (!tickerData[i]) {
      return;
    }

    if (type === 'bar') {
      prepped.push([tickerData[i].open, tickerData[i].close]);
    } else {
      prepped.push(tickerData[i].open);
    }
  })

  return prepped;
};

const ch = {
  getTickers,
  getLabels,
  getDataForType,
  prepData
};

export default ch;