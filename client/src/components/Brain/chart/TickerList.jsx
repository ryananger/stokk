import React, {useState, useEffect} from 'react';
import ch from './chart.js';

const TickerList = function({tickers}) {

  var render = function() {
    var rendered = [];

    for (var key in tickers) {
      var mostRecent = tickers[key][0];

      rendered.push(
        <div key={mostRecent.ticker} className='ticker h'>
          <div className='tickerKey'><b>{mostRecent.ticker}</b></div>
          <div className='tickerKey'>{ch.smallDate(mostRecent.date)}</div>
          <div className='tickerKey'>{mostRecent.open}</div>
          <div className='tickerKey'>{mostRecent.close}</div>
          <div className='tickerKey'>{mostRecent.high}</div>
          <div className='tickerKey'>{mostRecent.low}</div>
          <div className='tickerKey'>{mostRecent.volume}</div>
        </div>
      );
    }

    return rendered;
  }

  return (
    <div className='tickerList'>
      {render()}
    </div>
  )
}

export default TickerList;