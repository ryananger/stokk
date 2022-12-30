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

  data.map(function(entry) {
    var change       = (entry.close/entry.open) - 1;
    var vwapOverOpen = entry.vwap/entry.open;

    var config = [entry.open, entry.high, entry.low];

    var entryData = config;

    converted.push(entryData);
  })

  return converted;
};

var useBrain = {
  dataConvert: dataConvert,
  dataSplit: dataSplit
};

export default useBrain;