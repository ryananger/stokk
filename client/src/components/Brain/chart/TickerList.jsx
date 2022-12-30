import React, {useState, useEffect} from 'react';
import ch from './chart.js';

const TickerList = function({tickers}) {
  var render = function() {
    var rendered = [];

    var i = 0;
    for (var key in tickers) {
      var mostRecent = tickers[key][0];
      var tag = '';

      i++;
      if (i % 2 === 0) {
        tag = 'alt2';
      }

      rendered.push(
        <div key={mostRecent.ticker} className={'ticker v ' + tag}>
          <div className='tickerHead h'>
            <div className='tickerKey h'>
              <b>{mostRecent.ticker}</b>
              {ch.smallDate(mostRecent.date)}
            </div>
            <div className='smallButton'/>
          </div>
          <div className='tickerRow h'>
            <div className='tickerKey h'><b>Open:</b>  {mostRecent.open}</div>
            <div className='tickerKey h'><b>High:</b> {mostRecent.high}</div>
          </div>
          <div className='tickerRow h'>
            <div className='tickerKey h'><b>Close:</b> {mostRecent.close}</div>
            <div className='tickerKey h'><b>Low:</b>  {mostRecent.low}</div>
          </div>
          <div className='tickerVol h'><b>Volume:</b> {mostRecent.volume}</div>
        </div>
      );
    }

    return rendered;
  };

  return (
    <div className='listContainer h'>
      <div className='watchList'>
        This will contain some set of lists that expands to view tickers in each list.
        <br/><br/>
        The brain will also have access to this interface.
      </div>
      <div className='tickerList'>
        {render()}
      </div>
    </div>
  )
}

export default TickerList;