import React, {useState} from 'react';
import helpers from './util/helpers.js';
import Ticker from './Ticker.jsx';

const labels = helpers.labels;

const Data = function({data}) {
  const st = window.state;
  const [page, setPage] = useState(0);
  const pages = helpers.getPages(data);
  const tickers = function() {
    let tickers = {};

    data.map(function(entry) {
      if (!tickers[entry.ticker]) {
        tickers[entry.ticker] = [entry];
      } else {
        tickers[entry.ticker].push(entry);
      }
    })

    return tickers;
  }()

  var renderTickers = function() {
    var rendered = [];

    for (var key in tickers) {
      rendered.push(<Ticker key={key} ticker={key} data={tickers[key]}/>);
    }

    return rendered;
  };

  if (!data[0]) {
    return;
  }

  return (
    <div className='dataRender v'>
      <div className='dataTable v'>
        {renderTickers()}
      </div>
    </div>
  )
}

export default Data;