import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import ax from '../ax.js';
import helpers from '../helpers.js';

const dateString = document.cookie.slice(5);
const startDate = {
  year:  dateString.slice(0, 4),
  month: dateString.slice(5, 7),
  day:   dateString.slice(8)
};

console.log('Date from cookie: ', startDate);

const App = function() {
  const [data, addData] = useState([]);
  const [marketDate, setDate] = useState(startDate);

  useEffect(function() {
    //ax.polygonDataLoop(marketDate, setDate);
  }, [marketDate]);

  return (
    <div>
      <h1>stokk</h1>
      {JSON.stringify(data)}
    </div>
  )
}

export default App;