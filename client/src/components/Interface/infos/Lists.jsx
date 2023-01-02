import React from 'react';

const Lists = function({list}) {
  const st = window.state;

  var render = function() {
    var set;

    switch (list) {
      case 'lists':
        set = st.savedLists;
        break;
      case 'queries':
        set = st.savedQueries;
        break;
    }

    var rendered = [];

    set.map(function(entry) {
      rendered.push(<div key={entry.name} className='infoEntry'>{entry.name}</div>)
    });

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