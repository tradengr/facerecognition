import React from 'react';

const StatusBar = () => {
  return (
    <div className='tc'>
      <div className='white f3 pt4'>
        <p className='mb0 mt0 f3'>Welcome, <span className='b'>Johnny</span>!</p>
        <p className='mt0 mb0 f3'>Total Images Detected: <span className='gold b'>69</span></p>
      </div>
    </div>
  );
};

export default StatusBar;