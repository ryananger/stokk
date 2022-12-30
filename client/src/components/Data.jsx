import React, {useState} from 'react';
import helpers from './util/helpers.js';

const labels = helpers.labels;

const Data = function({data}) {
  const [page, setPage] = useState(0);
  const pages = helpers.getPages(data);

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
    if (!data[0]) {
      return;
    }

    var rendered = [];

    // TODO: this only shows page 0, no options to switch pages.
    pages[page].map(function(entry, i) {
      var tag = '';

      if (i % 2 === 0) {
        tag = 'alt'
      }

      rendered.push((
        <div key={i} className={`entry ${tag} h`}>
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
      <div id='dataTable'>
        {renderData()}
      </div>
    </div>
  )
}

export default Data;