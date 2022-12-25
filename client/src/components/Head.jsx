import React from 'react';
import Brain from './Brain.jsx';
import ax from '../ax.js';

const Head = function({app}) {
  var runButton = function() {
    app.toggle(!app.running);
  };

  var runStop = function() {
    return app.running ? 'stop update' : 'update';
  };

  return (
    <div className='head h'>
      <h1>stokk</h1>
      <div className='navButtons h'>
        <Brain data={app.data}/>
        <input type='submit' id='updateButton' onClick={runButton} value={runStop()}/>
      </div>
    </div>
  )
}

export default Head;