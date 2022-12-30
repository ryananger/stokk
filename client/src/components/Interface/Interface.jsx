import React, {useState} from 'react';
import ax      from '../util/ax.js';
import helpers from '../util/helpers.js';
import Info    from './Info.jsx';
import Form    from './Form.jsx';

const labels = helpers.labels;

const Interface = function({data, queried, setData, setQueried}) {
  const [sort, setSort] = useState('date');
  const [infoView, setInfo] = useState('default');

  var toggleInfo = function() {
    if (infoView !== 'search') {
      setInfo('search');
    } else {
      setInfo('default');
    }
  };

  return (
    <div className='interLeft v'>
      <Info data={data} infoView={infoView} toggleInfo={toggleInfo}/>
      <Form setData={setData} setQueried={setQueried} />
    </div>
  )
}

export default Interface;