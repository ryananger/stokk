var helpers = {
  getURL: function(date) {
    var urlBase = 'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/';
    var urlDate = date;
    var urlMod = '?adjusted=true&apiKey=' + process.env.API_KEY;

    return urlBase + urlDate + urlMod;
  },
  dateToString: function(date) {
    var str = date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');

    return str;
  },
  newDate: function(date) {
    var newDate;

    switch (date.month) {
      case '13':
        newDate = false;
        break;
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        if (Number(date.day) < 31) {
          newDate = {
            ...date,
            day: (Number(date.day) + 1).toString().padStart(2, '0')
          }
        } else {
          newDate = {
            ...date,
            month: (Number(date.month) + 1).toString().padStart(2, '0'),
            day: '01'
          }
        }
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        if (Number(date.day) < 30) {
          newDate = {
            ...date,
            day: (Number(date.day) + 1).toString().padStart(2, '0')
          }
        } else {
          newDate = {
            ...date,
            month: (Number(date.month) + 1).toString().padStart(2, '0'),
            day: '01'
          }
        }
        break;
      case '02':
        if (Number(date.day) < 28) {
          newDate = {
            ...date,
            day: (Number(date.day) + 1).toString().padStart(2, '0')
          }
        } else {
          newDate = {
            ...date,
            month: (Number(date.month) + 1).toString().padStart(2, '0'),
            day: '01'
          }
        }
        break;
    }

    console.log('Next date: ', helpers.dateToString(newDate))
    return newDate;
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
  onlyHigher: function(data, chg) {
    var higher = [];
    var chg = chg || 5;

    data.map(function(stock) {
      if (stock.T.length > 4) {
        return;
      }

      if (stock.c > stock.o) {
        var change = Math.floor(((stock.c - stock.o)/stock.o) * 100);
        if (change > chg) {
          higher.push({change, stock});
        }
      }
    });

    return higher;
  }
};

export default helpers;