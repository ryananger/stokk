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

  useEffect(function() {
    if (running) {
      ax.polygonDataLoop(marketDate, setDate, toggle);
    }
  }, [marketDate, running]);

  return (
    <div id='app'>
      <Head data={data} toggle={toggle} running={running}/>

      <div className='interface h'>
        <Interface data={helpers.reverseData(data)} setData={setData}/>
        <Brain data={helpers.reverseData(data)}/>
      </div>

      <Data data={data}/>
    </div>
  )
}

export default App;