import React from 'react';

const Linkform = ({ onLinkChange, onDetect }) => {
  return (
    <div className='tc'>
      <h3 className='f3'>Enter an image link to detect Faces</h3>
      <div className='center'>
        {/* <div className='w-30 flex flex-wrap justify-center'> */}
        <div className='form center pa4'>
          <input className='f4 pa2 w-70 center' type='text' onChange={onLinkChange} />
          <button className='f4 ph3 pv2 w-30 dib grow link pointer' onClick={onDetect}>Detect</button>
          {/* <input className='pa2 w-70' type='text' />
          <button className='w-10 ml2 ph4 pv2 pointer link grow'>Detect</button> */}
        </div>
      </div>
    </div>
  );
};

export default Linkform;