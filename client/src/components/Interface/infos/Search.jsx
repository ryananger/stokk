import React from 'react';

const Search = function() {
  return (
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
}

export default Search;