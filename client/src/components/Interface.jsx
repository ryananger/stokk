import React, {useState} from 'react';
import ax from '../ax.js';
import helpers from '../helpers.js';

const labels = helpers.labels;

const Interface = function({setData}) {
  const [sort, setSort] = useState('date');
  const [infoView, setInfo] = useState('default');

  var handleSubmit = function(e) {
    e.preventDefault();

    var form = e.target;
    var filter = {};

    if (!form.ticker.value) {
      alert('Query at least one ticker.');
      return;
    }

    labels.map(function(key) {
      if (!form[key].value) {
        return;
      } else {
        var val = form[key].value;

        if (key === 'ticker') {
          val = val.toUpperCase();
        }

        filter[key] = val;
      }
    })

    console.log(filter)

    ax.getTickers(filter, sort, setData);
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
            <div className='searchInfoButton v' onMouseEnter={toggleInfo} onMouseLeave={toggleInfo}>i</div>
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

  var renderInfo = function() {
    var infos = {
      default: function() {
        return (
          <div className='defaultInfo v'>
            default
          </div>
        )
      }(),
      search: function() {
        return (
          <div className='searchInfo v'>
            Click the button to sort query by that parameter.
            <br/><br/>
            Format comparisons like this:
            <br/><br/>
            <label className='dummyLabel'>
              <div className='formTag'>open:</div>
              <input type='radio' id='dummy1' checked={0} readOnly/>
              <input type='text' value='>3, <=4' readOnly/>
            </label>
            <label className='dummyLabel'>
              <div className='formTag'>close:</div>
              <input type='radio' id='dummy2'checked readOnly/>
              <input type='text' value='>4' readOnly/>
            </label>
          </div>
        )
      }()
    };

    return infos[infoView];
  };

  var toggleInfo = function() {
    if (infoView !== 'search') {
      setInfo('search');
    } else {
      setInfo('default');
    }
  };

  return (
    <div className='interLeft v'>
      <div className='infoBox v'>
        {renderInfo()}
      </div>

      <form id='searchForm' onSubmit={handleSubmit} autoComplete='off'>
        {renderForm()}
        <input type='submit' value='Search'/>
      </form>
    </div>
  )
}

export default Interface;