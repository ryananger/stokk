import React from 'react';
import {useState, useEffect} from 'react';
import ax      from './util/ax.js';
import helpers from './util/helpers.js';

import Interface from './Interface/Interface.jsx';
import Brain from './Brain/Brain.jsx';
import Head from './Head.jsx';
import Data from './Data.jsx';

const startDate  = helpers.startDate;

const App = function() {
  const st         = window.state;
  const data       = st.data;
  const reversed   = helpers.reverseData(data);

  return (
    <div id='app'>
      <Head/>

      <div className='interface h'>
        <Interface data={reversed}/>
        <Brain     data={reversed}/>
      </div>

      <Data data={data}/>
    </div>
  )
}

export default App;