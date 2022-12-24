import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import ax from '../ax.js';
import helpers from '../helpers.js';

const dateString = helpers.getDateFromCookie();

const startDate = {
  year:  dateString.slice(0, 4),
  month: dateString.slice(5, 7),
  day:   dateString.slice(8)
};

console.log('Last date checked: ', startDate);

const App = function() {
  const [marketDate, setDate] = useState(startDate);
  const [running, toggle] = useState(false);

  var runButton = function() {
    toggle(!running);
  };

  var runStop = function() {
    return running ? 'Stop' : 'Run';
  };

  useEffect(function() {
    if (running) {
      ax.polygonDataLoop(marketDate, setDate, toggle);
    }
  }, [marketDate, running]);

  return (
    <div>
      <h1>stokk</h1>
      <button onClick={runButton}>{runStop()}</button>
      {}
    </div>
  )
}

export default App;