import React, {useState} from 'react';
import helpers from '../util/helpers.js';
import Info    from './Info.jsx';
import Form    from './Form.jsx';

const labels = helpers.labels;

const Interface = function({data}) {
  return (
    <div className='interLeft v'>
      <Info data={data}/>
      <Form/>
    </div>
  )
}

export default Interface;