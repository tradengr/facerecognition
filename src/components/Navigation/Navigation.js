import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
  if (route === 'home') {
    return (
      <nav className='flex justify-end'>
        <h2 className='f3 link near-white underline-hover dim pointer pr4 pt3' onClick={() => onRouteChange('signin')} >Sign Out</h2>
      </nav>
    )
  } else if (route === 'signin') {
    return (
      <nav className='flex justify-end'>
        <h2 className='f3 link near-white underline-hover dim pointer pr4 pt3' onClick={() => onRouteChange('signup')} >Sign Up</h2>
      </nav>
    )
  } else if (route === 'signup') {
      return (
        <nav className='flex justify-end'>
          <h2 className='f3 link near-white underline-hover dim pointer pr4 pt3' onClick={() => onRouteChange('signin')} >Sign In</h2>
        </nav>
      )
  }
};

export default Navigation;