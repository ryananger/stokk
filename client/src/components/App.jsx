import React from 'react';
import {useState, useEffect} from 'react';
import ax from '../ax.js';
import helpers from '../helpers.js';
import '../style.css';

import Interface from './Interface.jsx';
import Head from './Head.jsx';
import Brain from './Brain/Brain.jsx';
import Data from './Data.jsx';

const startDate  = helpers.startDate;

const App = function() {
  const [data, setData]       = useState([]);
  const [marketDate, setDate] = useState(startDate);
  const [running, toggle]     = useState(false);
  const [queried, setQueried] = useState([]);

  const reversed = helpers.reverseData(data);

  useEffect(function() {
    if (running) {
      ax.polygonDataLoop(marketDate, setDate, toggle);
    }
  }, [marketDate, running]);

  return (
    <div id='app'>
      <Head toggle={toggle} running={running}/>

      <div className='interface h'>
        <Interface data={reversed} queried={queried} setData={setData} setQueried={setQueried}/>
        <Brain data={reversed} queried={queried}/>
      </div>

      <Data data={data}/>
    </div>
  )
}

export default App;