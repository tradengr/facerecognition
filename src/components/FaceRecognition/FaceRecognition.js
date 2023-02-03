import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrlDetected, box }) => {
  return (
    <div className='center'>
      <div className='absolute'>
        <img id='img' src={imageUrlDetected} alt='' width='500px' height='auto' />
        <div className='bounding-box' style={{top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.leftCol }} ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;