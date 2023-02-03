import React from 'react';

const SignUp = ({ onRouteChange }) => {
  return (
    <article className="br4 ba b--near-white mv4 w-100 w-50-m w-25-l mw6 center bg-near-black">
      <main className="pa4 black-80">
        <div className="measure ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 near-white tc">Face Recognition</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-near-white hover-near-black w-100 near-white" type="name" name="name"  id="name" />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-near-white hover-near-black w-100 near-white" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3"> 
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-near-white hover-near-black w-100 near-white" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="center">
            <input className="b ph3 pv2 input-reset ba b--near-white bg-transparent grow pointer f6 dib near-white" 
                    type="submit" 
                    value="Sign up" 
                    onClick={() => onRouteChange('signin')}
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignUp;