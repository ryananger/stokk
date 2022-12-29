import React from 'react';
import Brain from './Brain.jsx';
import ax from '../ax.js';

const Head = function({toggle, running}) {
  var runButton = function() {
    toggle(!running);
  };

  var runStop = function() {
    return running ? 'stop update' : 'update';
  };

  return (
    <div className='head h'>
      <h1>stokk</h1>
      <input type='submit' id='updateButton' onClick={runButton} value={runStop()}/>
    </div>
  )
}

export default Head;