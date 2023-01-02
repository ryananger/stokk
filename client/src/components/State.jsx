import React, {useState} from 'react';
import App from './App.jsx';

const State = function() {
  // App
  const [data, setData]       = useState([]);
  const [queried, setQueried] = useState([]);
  // Interface
  const [sort, setSort]           = useState('date');
  const [infoView, setInfo]       = useState('default');
  const [savedQueries, saveQuery] = useState([]);
  const [savedLists, saveList]    = useState([]);
  // Brain
  const [predictions, setPredictions] = useState([]);

  const state = {
    data,
    setData,
    queried,
    setQueried,

    sort,
    setSort,
    infoView,
    setInfo,
    savedQueries,
    saveQuery,
    savedLists,
    saveList,

    predictions,
    setPredictions
  };

  window.state = state;

  return (
    <App/>
  );
};

export default State;