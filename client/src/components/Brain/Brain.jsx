import React, {useState, useEffect} from 'react';
import * as brain from 'brain.js';
import {saveAs}   from 'file-saver';

import ax       from '../util/ax.js';
import br       from './useBrain.js';
import helpers  from '../util/helpers.js';
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

const Brain = function({data}) {
  const [netJSON, setNetJSON] = useState(null);
  const [loaded, netLoaded]   = useState(false);

  const st             = window.state;
  const queried        = st.queried;
  const predictions    = st.predictions;
  const setPredictions = st.setPredictions;

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

    // TODO: Save the net with axios.
    let json = JSON.stringify(net.toJSON());
    let file = new Blob([json], {type: "text/plain;charset=utf-8"});
    saveAs(file, "net.txt");
  };

  var testBrain = function() {
    let allPredictions = [];

    for (var ticker in datasets) {
      let set = datasets[ticker];

      let predict = br.testSet(net, set, 20, 5);
      allPredictions = allPredictions.concat(predict);
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
  useEffect(()=>{ax.getNet(setNetJSON)}, []);

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