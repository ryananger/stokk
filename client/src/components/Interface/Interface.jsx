import React, {useState} from 'react';
import ax      from '../util/ax.js';
import helpers from '../util/helpers.js';
import Info    from './Info.jsx';
import Form    from './Form.jsx';

const labels = helpers.labels;

const Interface = function({data, queried, setData, setQueried}) {
  const [sort, setSort] = useState('date');
  const [infoView, setInfo] = useState('default');
  const [savedQueries, addQuery] = useState([]);
  const [savedLists, setLists] = useState([]);

  var toggleInfo = function(e) {
    var view = e.target.getAttribute('tag');

    if (infoView === view) {
      setInfo('default');
      return;
    }

    setInfo(view);
  };

  return (
    <div className='interLeft v'>
      <Info
        data={data}
        infoView={infoView}
        toggleInfo={toggleInfo}
        savedQueries={savedQueries}
        savedLists={savedLists}/>
      <Form
        setData={setData}
        setQueried={setQueried}
        savedQueries={savedQueries}
        addQuery={addQuery}/>
    </div>
  )
}

export default Interface;