import React, {useState} from 'react';
import ax      from '../util/ax.js';
import helpers from '../util/helpers.js';

const labels = helpers.labels;

const Info = function({data, infoView, toggleInfo}) {
  var renderInfo = function() {
    var infos = {
      default: (
        <div className='dataInfo v'>
          {dataInfo()}
        </div>
        ),
      lists: (
        <div className='listInfo v'>
          No lists available.
        </div>
      ),
      search: (
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
    };

    if (infoView === 'search') {
      return infos.search;
    }

    var container = (
      <div className='defaultInfo'>
        <div className='infoHead h'>
          <div className='listInfoButton' tag='lists' onMouseEnter={toggleInfo} onMouseLeave={toggleInfo}></div>
        </div>
        <div className='infoContainer v'>
          {infos[infoView]}
        </div>
      </div>
    );

    return container;
  };

  var dataInfo = function() {
    if (!data[0]) {
      return (
        <div>
          Welcome!
          <br/><br/>
          Query the database below to retrieve stock data.
        </div>
      )
    } else {
      return `Found ${data.length} entries that meet the search criteria.`
    }
  };

  return (
    <div className='infoBox v'>
      {renderInfo()}
      <div className='searchInfoButton v' tag='search' onMouseEnter={toggleInfo} onMouseLeave={toggleInfo}>i</div>
    </div>
  )
}

export default Info;