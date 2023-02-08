import React, { Component } from 'react';

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  onEmailInput = (event) => {
    this.setState({ email: event.target.value });
  }
  onPasswordInput = (event) => {
    this.setState({ password: event.target.value });
  }
  onSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }) 
    })
      .then(res => res.json())
      .then(user => {
        if (user.email === this.state.email) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          const msg = document.querySelector('#notify');
          msg.textContent = 'Invalid Username or Password'
        }
      })
  }
  
  render() {
    return (
      <article className="br4 ba b--near-white mv4 w-100 w-50-m w-25-l mw6 center bg-near-black">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 near-white tc">Face Recognition</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-near-white hover-near-black w-100 near-white" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  onChange={this.onEmailInput}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-near-white hover-near-black w-100 near-white" 
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={this.onPasswordInput}

                />
              </div>
            </fieldset>
            <div className='center'>
              <p id='notify' className='gold'></p>
            </div>
            <div className="center">
              <input className="b ph3 pv2 input-reset ba b--near-white bg-transparent grow pointer f6 dib near-white" 
                      type="submit" 
                      value="Sign in" 
                      // onClick={() => this.props.onRouteChange('home')}
                      onClick={this.onSignIn}
              />
            </div>
            <div className="lh-copy mt3 w-50 center">
              <p className="f6 link dim near-white db tc underline-hover pointer" onClick={() => this.props.onRouteChange('signup')}>Sign up</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
};

export default SignIn;