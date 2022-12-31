import helpers  from '../util/helpers.js';

var dataSplit = function(data, sets) {
  var split = {};

  sets.map(function(ticker) {
    split[ticker] = [];
  });

  data.map(function(entry) {
    split[entry.ticker].push(entry);
  })

  return split;
};

var dataConvert = function(data, keys) {
  var converted = [];
  var start = data[0];

  data.map(function(entry) {
    var change       = (entry.close/entry.open) - 1;
    var vwapOverOpen = entry.vwap/entry.open;

    var config = [entry.open/start.open];

    var entryData = config;

    converted.push(entryData);
  })

  return converted;
};

var testSet = function(net, set, sliceLength, forecastLength) {
  let predicted = [];

  for (var i = 0; i < set.length; i++) {
    let testingData = set.slice(i, i + sliceLength);
    let test = dataConvert(testingData);

    let start = testingData[0];
    let ran = net.run(test);
    let exp = set[i];

    let pOpen = helpers.trunc(ran[0] * start.open);
    let prediction = {ticker: 'pre' + exp.ticker, date: exp.date, open: pOpen};

    predicted.push(prediction);

    let forecasted = [];
    let forecast = net.forecast(test, forecastLength);

    let dates = [];

    for (var j = 0; j < forecastLength; j++) {
      if (set[i + j]) {
        dates.push(set[i + j].date);
      } else {
        dates.push('future');
      }
    }

    forecast.map(function(entry, num) {
      let result = {date: dates[num], open: helpers.trunc(entry * start.open)};

      forecasted.push(result);
    })

    console.log('');
    console.log('-----');
    console.log(`Result for ${exp.ticker} on ${exp.date}: `);
    console.log('Predicted open: ', helpers.trunc(ran[0]) * start.open);
    console.log('Expected open:  ', exp.open);
    console.log('---')
    console.log(`Forecast:`);
    forecasted.map(function(entry) {
      console.log(`${entry.date}: `, entry.open);
    })
  }

  return predicted;
}
var useBrain = {
  dataConvert: dataConvert,
  dataSplit: dataSplit,
  testSet: testSet
};

export default useBrain;