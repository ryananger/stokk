import React, {useState, useEffect} from 'react';
import ax      from '../util/ax.js';
import helpers from '../util/helpers.js';

const labels = helpers.labels;

const Form = function({setData, setQueried}) {
  const [sort, setSort] = useState('date');
  const [popup, togglePopup] = useState(false);
  const [savedQueries, addQuery] = useState([]);

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;
    var filter = {};
    var queriedTickers = [];

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

        if (key === 'ticker') {
          val = val.toUpperCase();

          var split = val.replaceAll(' ', '').split(',');

          split.map(function(ticker) {
            queriedTickers.push(ticker);
          })

          validForm = true;
        }

        filter[key] = val;
      }
    })


    if (!validForm) {
      alert('Empty query. Query at least one ticker OR at least one number and date parameter.');
      return;
    }

    console.log('Query filter: ', filter)

    var cb = function() {
      setQueried(queriedTickers);
    };

    ax.getTickers(filter, sort, setData, cb);
  };

  var sortChange = function(e) {
    setSort(e.target.id.replace('Radio', ''));
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
            <input type='radio' id='dateRadio' checked={(sort === 'date')} onChange={sortChange}/>
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
            <input type='radio' id={label + 'Radio'} checked={(sort === label)} onChange={sortChange}/>
            <input type='text' id={label}/>
          </label>
        )

        return;
      }

      rendered.push(
        <label key={label + 'Label'}>
          <div className='formTag'>{label}:</div>
          <input type='radio' id={label + 'Radio'} checked={(sort === label)} onChange={sortChange}/>
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

  var saveQuery = function(e) {
    var value = document.querySelector('#saveQuery').value;
    var saved = savedQueries;

    saved.unshift(value);

    addQuery(saved);
    togglePopup(!popup)
  };

  var renderPopup = function() {
    if (popup) {
      return (
        <div className='plusPopup v'>
          <input id='saveQuery' type='text' placeholder='Save query as...' autoComplete='off'/>
          <button id='saveButton' onClick={saveQuery}>save</button>
        </div>
      )
    }
  };

  var clearForm = function() {
    var form = document.querySelector('#form');
    form.reset();
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