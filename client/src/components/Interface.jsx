import React from 'react';
import ax from '../ax.js';
import helpers from '../helpers.js';

const labels = helpers.labels;

const Interface = function({setData}) {
  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;
    var filter = {};

    labels.map(function(key) {
      if (!form[key].value) {
        return;
      } else {
        var val = form[key].value;

        if (key === 'ticker') {
          val = val.toUpperCase();
        }

        filter[key] = val;
      }
    })

    ax.getTickers(filter, setData);
  };

  return (
    <div className='interLeft v'>
      <div id='searchHead'>
        This will contain information about querying the stock data.

        More on the way.
      </div>
      <form id='searchForm' onSubmit={handleSubmit} autoComplete='off'>
        <label>
          <div className='formTag'>Ticker:</div>
          <input type='text' id='ticker'/>
        </label>
        <label>
          <div className='formTag'>Open:</div>
          <input type='text' id='open'/>
        </label>
        <label>
          <div className='formTag'>Close:</div>
          <input type='text' id='close'/>
        </label>
        <label>
          <div className='formTag'>High:</div>
          <input type='text' id='high'/>
        </label>
        <label>
          <div className='formTag'>Low:</div>
          <input type='text' id='low'/>
        </label>
        <label>
          <div className='formTag'>Volume:</div>
          <input type='text' id='volume'/>
        </label>
        <label>
          <div className='formTag'>VWAP:</div>
          <input type='text' id='vwap'/>
        </label>
        <label>
          <div className='formTag'>Date:</div>
          <input type='date' id='date'/>
        </label>
        <input type='submit' value='Search'/>
      </form>
    </div>
  )
}

export default Interface;