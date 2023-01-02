import React, {useState} from 'react';
import Info    from './Info.jsx';
import Form    from './Form.jsx';

const Interface = function({data}) {
  const [updates, update] = useState(false);

  return (
    <div className='interface v'>
      <Info data={data}/>
      <Form updates={updates} update={update}/>
    </div>
  )
}

export default Interface;