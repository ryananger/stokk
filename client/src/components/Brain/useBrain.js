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
  dataConvert: dataConvert
};

export default useBrain;