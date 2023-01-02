import React, {useState, useEffect} from 'react';
import Lists      from './infos/Lists.jsx';
import Search     from './infos/Search.jsx';
import ax         from '../util/ax.js';
import helpers    from '../util/helpers.js';

const labels = helpers.labels;

const Info = function({data}) {
  const st = window.state;

  var toggleInfo = function(e) {
    var view = e.target.getAttribute('tag');

    if (st.infoView === view) {
      st.setInfo('default');
      return;
    }

    st.setInfo(view);
  };

  var renderInfo = function() {
    var infos = {
      default: (
        <div className='dataInfo v'>
          {dataInfo()}
        </div>
        ),
      lists:   (<Lists list={'lists'} set={st.savedLists}/>),
      queries: (<Lists list={'queries'} set={st.savedQueries}/>),
      search:  (<Search/>)
    };

    if (st.infoView === 'search') {
      return infos.search;
    }

    var container = (
      <div className='defaultInfo'>
        <div className='infoHead h'>
          <div className='listInfoButton' tag='lists' onMouseEnter={toggleInfo} onMouseLeave={toggleInfo}>lists</div>
          <div className='listInfoButton' tag='queries' onClick={toggleInfo}>queries</div>
        </div>
        <div className='infoContainer v'>
          {infos[st.infoView]}
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