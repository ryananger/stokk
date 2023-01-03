import React, {useState} from 'react';
import {AiFillEye} from 'react-icons/ai';
import {FaListUl, FaBrain} from 'react-icons/fa';
import helpers from './util/helpers.js';

const Ticker = function({ticker, data}) {

  var render = function() {
    var rendered = [];
    var slice = data.slice(0, 60);

    slice.map(function(entry, i) {
      var tag = '';

      if (i % 2 === 0) {
        tag = 'alt';
      }

      rendered.push(
        <div key={i} className={`entryRow ${tag} h`}>
          <div className='entryKey'>
            <b>{helpers.smallDate(entry.date)}, {entry.date.slice(0, 4)}</b>
          </div>
          <div className='v'>
            <div className='entryKey h'>
              <b>Open:</b>
              <div>
                {helpers.trunc(entry.open)}
              </div>
            </div>
            <div className='entryKey h'>
              <b>Close:</b>
              <div>
                {helpers.trunc(entry.close)}
              </div>
            </div>
          </div>

          <div className='v'>
            <div className='entryKey h'>
              <b>High:</b>
              <div>
                {helpers.trunc(entry.high)}
              </div>
            </div>
            <div className='entryKey h'>
              <b>Low:</b>
              <div>
                {helpers.trunc(entry.low)}
              </div>
            </div>
          </div>
          <div className='entryKey'><b>Volume: </b>{Math.floor(entry.volume)}</div>
        </div>
      )
    })

    return rendered;
  };

  return (
    <div className='entryTicker v'>
      <div className='entryHead h'>
        <h2>{ticker}</h2>
        <div className='tickerButtons h'>
          <div className='tickerButton v'>
            {/* <FaBrain   size={24}/> */}
          </div>
          <div className='tickerButton v'>
            <AiFillEye size={32}/>
          </div>
          <div className='tickerButton v'>
            <FaListUl  size={24}/>
          </div>
        </div>
      </div>
      <div className='entryScroll v'>
        {render()}
      </div>
    </div>
  )
}

export default Ticker;