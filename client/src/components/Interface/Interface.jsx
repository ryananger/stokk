import React, {useState} from 'react';
import Info    from './Info.jsx';
import Form    from './Form.jsx';

const Interface = function({data}) {
  const [updates, update] = useState(false);

  var refresh = function() {
    update(!updates);
  };

  return (
    <div className='interface v'>
      <Info data={data}/>
      <Form refresh={refresh}/>
    </div>
  )
}

export default Interface;