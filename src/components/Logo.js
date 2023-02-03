import React from 'react';
import Tilt from 'react-parallax-tilt'
import './Logo.css';

const Logo = () => {
  return (
    <Tilt className='tilt'>
        <img src='./images/facerecoglogo.png' alt='facerecognition-logo' />
    </Tilt>
  );
};

export default Logo;