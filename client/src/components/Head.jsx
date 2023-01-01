import React, {useEffect, useState} from 'react';
import Brain   from './Brain/Brain.jsx';
import ax      from './util/ax.js';
import helpers from './util/helpers.js';

const Head = function() {
  const [marketDate, setDate] = useState(helpers.startDate);
  const [running, toggle]     = useState(false);

  var runButton = function() {
    toggle(!running);
  };

  var runStop = function() {
    return running ? 'stop update' : 'update';
  };

  useEffect(function() {
    if (running) {
      ax.polygonDataLoop(marketDate, setDate, toggle, running);
    }
  }, [marketDate, running]);

  return (
    <div className='head h'>
      <h1>stokk</h1>
      <input type='submit' id='updateButton' onClick={runButton} value={runStop()}/>
    </div>
  )
}

export default Head;