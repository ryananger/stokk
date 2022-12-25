import React, {useState, useEffect} from 'react';
import ax from '../ax.js';
import helpers from '../helpers.js';
import * as brain from 'brain.js';
import {saveAs} from 'file-saver';

const Brain = function({data}) {
  const net = new brain.recurrent.LSTMTimeStep();
  const [netJSON, setNetJSON] = useState(null);

  var trainBrain = function() {
    if (data.length === 0) {
      alert('Query data before training.');
      return;
    }

    var trainingData = helpers.dataConvert(data, ['open', 'close']);
    var options = {iterations: 10000, log: true, logPeriod: 1000, errorThresh: 0.01};

    console.log('Training on set: ', trainingData);
    net.train([trainingData], options);

    // TODO: separate testing and save different nets via ax request
    var test = trainingData.slice(trainingData.length - 5);
    let ran = net.run(test);

    console.log(ran);

    let json = JSON.stringify(net.toJSON());
    let file = new Blob([json], {type: "text/plain;charset=utf-8"});
    saveAs(file, "net.txt");
  };

  useEffect(function() {
    var netJSON = ax.getNet(setNetJSON);

    if (netJSON) {
      net.fromJSON(netJSON);

      console.log('Neural Network loaded: ', net);
    }
  }, [netJSON]);

  return (
    <div className='brain'>
      <input type='submit' id='brainButton' onClick={trainBrain} value='brain'/>
    </div>
  )
}

export default Brain;

// net.run() for single prediction, forecast for multiples.
//
// const forecast = net.forecast(
//   [
//     [4, 5],
//     [2, 4],
//   ],
//   3
// );

// console.log('next 3 predictions', forecast);