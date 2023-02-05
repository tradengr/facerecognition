import React from 'react';

const StatusBar = ({ userName, imageDetected }) => {
  return (
    <div className='tc'>
      <div className='white f3 pt4'>
        <p className='mb0 mt0 f3'>Welcome, <span className='b'>{userName}</span>!</p>
        <p className='mt0 mb0 f3'>Total Images Detected: <span className='gold b'>{imageDetected}</span></p>
      </div>
    </div>
  );
};

export default StatusBar;