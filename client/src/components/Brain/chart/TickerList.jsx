import React, {useState, useEffect} from 'react';
import ch from './chart.js';
import helpers from '../../util/helpers.js';

const TickerList = function({tickers}) {
  var render = function() {
    var rendered = [];

    var i = 0;
    for (var key in tickers) {
      var tickerSet = tickers[key];
      var tag = '';

      i++;
      if (i % 2 === 0) {
        tag = 'alt2';
      }

      tickerSet.map(function(entry, i) {
        var tickerHeadString = entry.ticker;
        var change = helpers.trunc((entry.close/entry.open*100) - 100);
        var plus = '+';

        if (i !== 0) {
          tickerHeadString = '';
        }

        if (change < 0) {
          plus = '';
        }

        rendered.push(
          <div key={entry.ticker + i} className={'ticker v ' + tag}>
            <div className='tickerHead h'>
              <div className='tickerRow h'>
                <div className='tickerKey h'>
                  <b>{tickerHeadString}</b>
                  {ch.smallDate(entry.date)}
                </div>
                <div className='tickerChange h'>
                  {plus + change + '%'}
                </div>
              </div>
              <div className='smallButton'/>
            </div>
            <div className='tickerRow h'>
              <div className='tickerKey h'><b>Open: </b>{entry.open}</div>
              <div className='tickerKey h'><b>High: </b>{entry.high}</div>
            </div>
            <div className='tickerRow h'>
              <div className='tickerKey h'><b>Close:</b>{entry.close}</div>
              <div className='tickerKey h'><b>Low:  </b>{entry.low}</div>
            </div>
            <div className='tickerVol h'><b>Volume: </b>{entry.volume}</div>
          </div>
        );
      })


    }

    return rendered;
  };

  return (
      <div className='tickerList'>
        {render()}
      </div>
  )
}

export default TickerList;