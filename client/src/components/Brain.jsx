import React, {useState, useEffect} from 'react';
import ax from '../ax.js';
import helpers from '../helpers.js';
import * as brain from 'brain.js';
import {saveAs} from 'file-saver';
import Draw from './chart/Draw.jsx';

import testData from './chart/testData.js';

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 3,
  hiddenLayers: [20, 10, 5],
  outputSize: 3,
});

const Brain = function({data, setVis}) {
  const [netJSON, setNetJSON] = useState(null);
  const [loaded, netLoaded]   = useState(false);

  var trainBrain = function() {
    if (data.length === 0) {
      alert('Query data before training.');
      return;
    }

    var trainingData = helpers.dataConvert(data);
    var options = {
      iterations: 5000,
      log: true,
      logPeriod: 1000,
      errorThresh: 0.01
    };

    console.log(`Training on ${trainingData.length} entries.`);
    net.train([trainingData], options);

    let json = JSON.stringify(net.toJSON());
    let file = new Blob([json], {type: "text/plain;charset=utf-8"});
    saveAs(file, "net.txt");
  };

  var testBrain = function() {
    if (data.length === 0) {
      alert('Query data before testing.');
      return;
    }

    let testingData = data.slice(0, 20);
    let test = helpers.dataConvert(testingData);

    let ran = net.run(test);
    let exp = data[test.length];

    let info = {rOpen: ran[0], eOpen: exp.open, rClose: ran[1], eClose: exp.close};
    let result = [];

    ran.map(function(val) {
      result.push(helpers.trunc(val));
    })

    console.log(`Result for ${exp.date}: `);
    console.log('Open:  ', ran[0], 'Expected open:  ',  exp.open);
    console.log('Close: ', ran[1], 'Expected close: ', exp.close);

    let forecast = net.forecast(test, 5);
    let expected = data.slice(20, 25);

    forecast.map(function(prediction, i) {
      var p = [];

      prediction.map(function(val) {
        p.push(helpers.trunc(val));
      })

      console.log(`Forecast for ${expected[i].date}: `, p, expected[i].open);
    })
  };

  var getNetJSON = function() {
    ax.getNet(setNetJSON);

    if (netJSON && !loaded) {
      net.fromJSON(netJSON);
      netLoaded(true);

      console.log('Neural Network loaded: ', net);
    }
  };

  var draw = function() {
    if (data[0]) {
      return <Draw data={data}/>
    }
  };

  useEffect(getNetJSON, [netJSON]);

  return (
    <div className='visualContainer v'>
      <div className='brainHeader h'>
        <h3>brain</h3>
        <div className='brainButtons h'>
          <button className='brainButton' onClick={trainBrain}>train</button>
          <button className='brainButton' onClick={testBrain}>test</button>
        </div>
      </div>
      {draw()}
    </div>
  )
}

export default Brain;

// var trainingData = [
//   [1,  1, 1],
//   [2, .9, 1],
//   [3, .8, 2],
//   [4, .7, 2],
//   [5, .6, 2],
//   [6, .5, 2],
//   [7, .4, 3],
//   [8, .3, 3],
//   [9, .2, 3],
//   [10,.1, 4],
//   [11,.1, 4],
//   [12,.1, 5]
// ];