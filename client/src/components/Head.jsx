import React from 'react';
import ax from '../ax.js';

const Head = function({toggle, running}) {
  var runButton = function() {
    toggle(!running);
  };

  var runStop = function() {
    return running ? 'Stop Updating' : 'Run Update';
  };

  return (
    <div className='head h'>
      <h1>stokk</h1>
      <input type='submit' id='updateButton' onClick={runButton} value={runStop()}/>
    </div>
  )
}

export default Head;