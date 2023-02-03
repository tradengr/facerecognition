import React from 'react';

const Linkform = ({ onLinkChange, onDetect }) => {
  return (
    <article className="br4 ba b--near-white mv4 w-100 w-50-m w-25-l mw6 center bg-near-black">
      <div className='tc pt0'>
        <h3 className='f3 mb1'>Enter an image link to detect Faces</h3>
        <div className='center'>
          {/* <div className='w-30 flex flex-wrap justify-center'> */}
          <div className='form center pa4 pt0'>
            <input className='f4 pa2 w-70 center' type='text' onChange={onLinkChange} />
            <button className='f4 ph3 pv2 w-30 dib grow link pointer' onClick={onDetect}>Detect</button>
            {/* <input className='pa2 w-70' type='text' />
            <button className='w-10 ml2 ph4 pv2 pointer link grow'>Detect</button> */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Linkform;