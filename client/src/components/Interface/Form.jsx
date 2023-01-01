import React, {useState, useEffect} from 'react';
import ax      from '../util/ax.js';
import helpers from '../util/helpers.js';

const labels = helpers.labels;

const Form = function() {
  const st = window.state;
  const [popup, togglePopup] = useState(false);

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;
    var filter = validateForm();

    if (!filter) {
      return;
    }

    var queriedTickers = [];

    if (filter.ticker) {
      var split = filter.ticker.replaceAll(' ', '').split(',');

      split.map(function(ticker) {
        queriedTickers.push(ticker);
      })
    }

    var cb = function() {
      st.setQueried(queriedTickers);
    };

    ax.getTickers(filter, st.sort, st.setData, cb);
  };

  var validateForm = function() {
    var form = document.querySelector('#form');
    var filter = {};

    var validForm = false;
    var numFields = 0;

    labels.map(function(key) {
      if (!form[key].value) {
        return;
      } else {
        var val = form[key].value;

        numFields++;
        if (numFields > 1) {
          validForm = true;
        }

        filter[key] = val;
      }
    })

    if (filter.ticker) {
      filter.ticker = filter.ticker.toUpperCase();
      validForm = true;
    }

    if (!validForm) {
      alert('Empty query. Query at least one ticker OR at least one number and date parameter.');
      return;
    }

    console.log('Query filter: ', filter);

    return filter;
  };

  var sortChange = function(e) {
    st.setSort(e.target.id.replace('Radio', ''));
  };

  var setDate = function() {
    var dateEnd = document.querySelector('#dateEnd');

    if (!dateEnd.value) {
      dateEnd.value = helpers.getTodayString();
    }
  };

  var renderForm = function() {
    var rendered = [];
    var date = [];

    labels.map(function(label) {
      if (label === 'dateEnd') {
        return;
      }

      if (label === 'date') {
        date.push(
          <label key='date'>
            <div className='formTag'>dates:</div>
            <input type='radio' id='dateRadio' checked={(st.sort === 'date')} onChange={sortChange}/>
            <input type='date' id='date' onChange={setDate}/>
          </label>
        )
        date.push(
          <label key='dateEnd'>
            <div className='formTag'> </div>
            <input type='date' id='dateEnd'/>
          </label>
        )
        return;
      }

      if (label === 'ticker') {
        rendered.push(
          <label key={label + 'Label'} className='tickerLabel'>
            <div className='formTag'>{label}:</div>
            <input type='radio' id={label + 'Radio'} checked={(st.sort === label)} onChange={sortChange}/>
            <input type='text' id={label}/>
          </label>
        )

        return;
      }

      rendered.push(
        <label key={label + 'Label'}>
          <div className='formTag'>{label}:</div>
          <input type='radio' id={label + 'Radio'} checked={(st.sort === label)} onChange={sortChange}/>
          <input type='text' id={label}/>
        </label>
      )
    });

    rendered.push(date);
    rendered.push(
      <label key='order'>
        <div className='formTag'>order:</div>
        <select id='order'>
          <option value={-1}>descending</option>
          <option value={1}>ascending</option>
        </select>
      </label>
    )

    return rendered;
  };

  var saveQuery = function() {
    var filter = validateForm();

    if (!filter) {
      return;
    }

    var value = document.querySelector('#saveQuery').value;
    var saved = st.savedQueries;

    saved.unshift({name: value, filter: filter});

    st.saveQuery(saved);
    togglePopup(!popup);
  };

  var renderPopup = function() {
    if (popup) {
      return (
        <div className='plusPopup h'>
          <input id='saveQuery' type='text' placeholder='Save query as...' autoComplete='off'/>
          <button id='saveButton' onClick={saveQuery}>save</button>
        </div>
      )
    }
  };

  var clearForm = function() {
    var form = document.querySelector('#form');
    form.reset();

    togglePopup(false);
    st.setData([]);
    st.setQueried([]);
  };

  useEffect(()=>{}, [popup])

  return (
    <div id='formContainer'>
      <form id='form' onSubmit={handleSubmit} autoComplete='off'>
        <div className='closeButton v' onClick={clearForm}><div className='ex'>x</div></div>
        <div className='plusButton v'>
          <div className='plus' onClick={()=>{togglePopup(!popup)}}>+</div>
        </div>
        {renderForm()}
        <input type='submit' value='Search'/>
      </form>
      {renderPopup()}
    </div>

  )
}

export default Form;