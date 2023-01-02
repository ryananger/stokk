import React, {useState, useEffect} from 'react';
import App from './App.jsx';
import helpers from './util/helpers.js';

const cookie  = helpers.parseCookie(document.cookie);
const queries = cookie.Queries ? JSON.parse(cookie.Queries) : {};
const lists   = cookie.Lists ? JSON.parse(cookie.Lists) : {};

const State = function() {
  // App
  const [data, setData]       = useState([]);
  const [queried, setQueried] = useState([]);
  // Interface
  const [sort, setSort]           = useState('date');
  const [infoView, setInfo]       = useState('default');
  const [savedQueries, saveQuery] = useState(queries);
  const [savedLists, saveList]    = useState(lists);
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