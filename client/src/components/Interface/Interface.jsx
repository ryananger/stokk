import React, {useState} from 'react';
import Info    from './Info.jsx';
import Form    from './Form.jsx';

const Interface = function({data}) {
  return (
    <div className='interface v'>
      <Info data={data}/>
      <Form/>
    </div>
  )
}

export default Interface;