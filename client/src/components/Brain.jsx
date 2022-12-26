import React, {useState, useEffect} from 'react';
import ax from '../ax.js';
import helpers from '../helpers.js';
import * as brain from 'brain.js';
import {saveAs} from 'file-saver';

const Brain = function({data}) {
  const net = new brain.recurrent.LSTMTimeStep();
  const [netJSON, setNetJSON] = useState(null);
  const [loaded, netLoaded] = useState(false);

  var trainBrain = function() {
    if (data.length === 0) {
      alert('Query data before training.');
      return;
    }

    var trainingData = helpers.dataConvert(data, ['open', 'high', 'vwap']);
    var options = {iterations: 20000, log: true, logPeriod: 1000, errorThresh: 0.01};

    console.log('Training on set: ', trainingData);
    net.train([trainingData], options);

    // TODO: separate testing and save different nets via ax request
    let test = trainingData.slice(0, 20);

    let ran = net.run(test);

    let result = [];
    let expected = trainingData[test.length + 1];

    ran.map(function(val) {
      result.push(helpers.trunc(val));
    })

    console.log('Result: ', result, 'Expected: ', expected);

    let forecast = net.forecast(test, 15);
    result = [];

    forecast.map(function(prediction) {
      var p = [];

      prediction.map(function(val) {
        p.push(helpers.trunc(val));
      })

      result.push(p);
    })

    console.log('Forecast: ', result);

    let json = JSON.stringify(net.toJSON());
    let file = new Blob([json], {type: "text/plain;charset=utf-8"});
    saveAs(file, "net.txt");
  };

  var getNetJSON = function() {
    ax.getNet(setNetJSON);

    if (netJSON && !loaded) {
      net.fromJSON(netJSON);
      netLoaded(true);

      console.log('Neural Network loaded: ', net);
    }
  };

  useEffect(getNetJSON, [netJSON]);

  return (
    <div className='brain'>
      <input type='submit' id='brainButton' onClick={trainBrain} value='brain'/>
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