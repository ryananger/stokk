import React, {useEffect} from 'react';

const Lists = function({list}) {
  const st = window.state;
  var set;

  switch (list) {
    case 'lists':
      set = st.savedLists;
      break;
    case 'queries':
      set = st.savedQueries;
      break;
  }

  var loadQuery = function(e) {
    var name = e.target.getAttribute('name');
    var form = document.querySelector('#form');
    var filter = set[name];

    form.reset();
    for (var key in filter) {
      form[key].value = filter[key];
    }
  };

  var render = function() {
    var rendered = [];

    for (var name in set) {
      rendered.push(<div key={name} name={name} className='infoEntry' onClick={loadQuery}>{name}</div>);
    }

    if (!rendered[0]) {
      return `No ${list} available.`
    }

    return rendered;
  };

  return (
    <div className='listInfo v'>
      {render()}
    </div>
  )
}

export default Lists;