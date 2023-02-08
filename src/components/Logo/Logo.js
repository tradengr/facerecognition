import React from 'react';
import Tilt from 'react-parallax-tilt'
import './Logo.css';

const Logo = () => {
  return (
    <Tilt className='tilt'>
        <img src='https://cdn-icons-png.flaticon.com/512/2223/2223055.png' alt='facerecognition-logo' />
    </Tilt>
  );
};

export default Logo;