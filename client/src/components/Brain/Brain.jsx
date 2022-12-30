import React, {useState, useEffect} from 'react';
import * as brain from 'brain.js';
import {saveAs}   from 'file-saver';

import ax       from '../util/ax.js';
import br       from './useBrain.js';
import helpers  from '../util/helpers.js';
import testData from './chart/testData.js';
import Draw     from './chart/Draw.jsx';

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 3,
  hiddenLayers: [10, 10],
  outputSize: 3,
});

const Brain = function({data, queried}) {
  const [netJSON, setNetJSON] = useState(null);
  const [loaded, netLoaded]   = useState(false);
  const options = {
      iterations: 5000,
      log: true,
      logPeriod: 1000,
      errorThresh: 0.01
    };

  const datasets = function() {
    if (!queried[0]) {
      return data;
    } else {
      return br.dataSplit(data, queried);
    }
  }();

  var trainBrain = function() {
    if (data.length === 0) {
      alert('Query data before training.');
      return;
    }

    for (var ticker in datasets) {
      var trainingData = br.dataConvert(datasets[ticker]);

      console.log(`Training on ${trainingData.length} entries for ticker ${ticker}.`);
      net.train([trainingData], options);
    }

    console.log('Training complete.');
    // let json = JSON.stringify(net.toJSON());
    // let file = new Blob([json], {type: "text/plain;charset=utf-8"});
    // saveAs(file, "net.txt");
  };

  var testBrain = function() {
    if (data.length === 0) {
      alert('Query data before testing.');
      return;
    }

    for (var ticker in datasets) {
      let set = datasets[ticker];

      let testingData = set.slice(0, 20);
      let test = br.dataConvert(testingData);

      let ran = net.run(test);
      let exp = set[test.length];

      let result = [];

      ran.map(function(val) {
        result.push(helpers.trunc(val));
      })

      console.log(`Result for ${exp.date}: `);
      console.log('Open:   ', ran[0], 'Expected open:   ',  exp.open);
      console.log('High:  ', ran[1], 'Expected high:  ', exp.close);

      let forecast = net.forecast(test, 5);
      let expected = set.slice(20, 25);

      forecast.map(function(prediction, i) {
        var p = [];

        prediction.map(function(val) {
          p.push(helpers.trunc(val));
        })

        console.log(`Forecast for ${expected[i].date}: `, p, expected[i].open);
      })
    }
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
      return <Draw data={data} queried={queried}/>
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
};

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