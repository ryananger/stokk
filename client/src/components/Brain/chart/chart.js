import chroma from 'chroma-js';

const getMonthName = function(monthNumber) {
  var date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString([], {month: 'long'}).slice(0, 3);
};

const smallDate = function(dateString) {
  var date = new Date(dateString);
  var month = getMonthName(date.getMonth() + 1);
  var day = date.getDate() + 1;

  return `${month} ${day}`;
};

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

    let label = [day, getMonthName(month)];

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
        var set = {
          label: ticker,
          data: prepData(type, ticker, tickers, labels)
        };

        if (type === 'line') {
          let yellow = 'rgb(230, 195, 130)';
          let h = chroma(yellow).get('hsl.h');
          let s = chroma(yellow).get('hsl.s');
          let l = chroma(yellow).get('hsl.l');

          let hInc = h + (i * 80);
          let nh = hInc < 360 ? hInc : hInc - 360;

          let color = chroma.hsl(nh, s, l).hex();

          set.borderColor = color;
          set.backgroundColor = color;
        }

        sets.push(set);

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

const chart = {
  smallDate,
  getTickers,
  getLabels,
  getDataForType,
  prepData
};

export default chart;