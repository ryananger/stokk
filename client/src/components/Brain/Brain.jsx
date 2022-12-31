import React, {useState, useEffect} from 'react';
import * as brain from 'brain.js';
import {saveAs}   from 'file-saver';

import ax       from '../util/ax.js';
import br       from './useBrain.js';
import helpers  from '../util/helpers.js';
import testData from './chart/testData.js';
import Draw     from './chart/Draw.jsx';

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 1,
  hiddenLayers: [20, 20],
  outputSize: 1,
});

const options = {
  iterations: 5000,
  log: true,
  logPeriod: 100,
  errorThresh: 0.01
};

const Brain = function({data, queried}) {
  const [netJSON, setNetJSON] = useState(null);
  const [loaded, netLoaded]   = useState(false);
  const [predictions, setPredictions] = useState([])

  const datasets = function() {
    if (!queried[0]) {
      return data;
    } else {
      return br.dataSplit(data, queried);
    }
  }();

  var trainBrain = function() {
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

    let allPredictions = [];

    for (var ticker in datasets) {
      // TODO: start with slice of 20, add predictions to slice, predict on that
      let set = datasets[ticker];

      let predicted   = [];
      let sliceLength = 20;
      console.log(predicted);

      for (var i = 0; i < set.length; i++) {
        //debugger;
        let testingData = set.slice(i, i + sliceLength);
        let test = br.dataConvert(testingData);

        let start = testingData[0];
        let ran = net.run(test);
        let exp = set[i];

        let pOpen = helpers.trunc(ran[0] * start.open);
        let prediction = {ticker: 'pre' + ticker, date: exp.date, open: pOpen};

        predicted.push(prediction);
        allPredictions.push(prediction);

        let forecasted = [];
        let forecast = net.forecast(test, 5);

        let dates = [];

        for (var j = 0; j < 5; j++) {
          if (set[i + j]) {
            dates.push(set[i + j].date);
          } else {
            dates.push('future');
          }
        }

        forecast.map(function(entry, num) {
          let result = {date: dates[num], open: helpers.trunc(entry * start.open)};

          forecasted.push(result);
        })

        console.log('');
        console.log('-----');
        console.log(`Result for ${exp.ticker} on ${exp.date}: `);
        console.log('Predicted open: ', helpers.trunc(ran[0]) * start.open);
        console.log('Expected open:  ', exp.open);
        console.log('---')
        console.log(`Forecast:`);
        forecasted.map(function(entry) {
          console.log(`${entry.date}: `, entry.open);
        })
      }
    }

    setPredictions(allPredictions);
  };

  var loadNet = function() {
    if (netJSON && !loaded) {
      net.fromJSON(netJSON);
      netLoaded(true);

      console.log('Neural Network loaded: ', net);
    }
  };

  var renderDraw = function() {
    var drawData = data;

    if (data[0]) {
      if (predictions) {
        drawData = data.concat(predictions);
      }

      return <Draw data={drawData} queried={queried}/>
    }
  };

  useEffect(function() {
    setPredictions([]);
  }, [data])

  var renderButtons = function() {
    if (queried[0]) {
      return (
        <div className='brainButtons h'>
          <button className='brainButton' onClick={trainBrain}>train</button>
          <button className='brainButton' onClick={testBrain}>test</button>
        </div>
      )
    }
  };

  useEffect(loadNet, [netJSON]);
  useEffect(()=>{ax.getNet(setNetJSON)}, [])

  return (
    <div className='visualContainer v'>
      <div className='brainHeader h'>
        <h3>brain</h3>
        {renderButtons()}
      </div>
      {renderDraw()}
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