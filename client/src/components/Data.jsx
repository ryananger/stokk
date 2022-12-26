import React from 'react';
import helpers from '../helpers.js';

const labels = helpers.labels;

const Data = function({data}) {
  var renderLabels = function() {
    var rendered = [];

    labels.map(function(label) {
      if (label !== 'dateEnd')
      rendered.push((
        <div key={label} className='tableKey'>{label}</div>
      ))
    })

    return (
      <div>
        <div className='keys h'>
          {rendered}
        </div>
        <hr/>
      </div>
    )
  };

  var renderData = function() {
    if (data.length === 0) {
      return;
    }

    var rendered = [];

    data.map(function(entry, i) {
      rendered.push((
        <div key={i} className='entry h'>
          <div className='entryKey'>{entry.ticker}</div>
          <div className='entryKey'>{entry.date}</div>
          <div className='entryKey'>{helpers.trunc(entry.open)}</div>
          <div className='entryKey'>{helpers.trunc(entry.close)}</div>
          <div className='entryKey'>{helpers.trunc(entry.high)}</div>
          <div className='entryKey'>{helpers.trunc(entry.low)}</div>
          <div className='entryKey'>{Math.floor(entry.volume)}</div>
          <div className='entryKey'>{helpers.trunc(entry.vwap)}</div>
        </div>
      ));
    })

    return rendered;
  };

  return (
    <div id='dataRender'>
      {renderLabels()}
      {renderData()}
    </div>
  )
}

export default Data;