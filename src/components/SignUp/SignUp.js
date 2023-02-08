import React, { Component } from 'react';

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onNameInput = (event) => {
    this.setState({ name: event.target.value });
  }
  onEmailInput = (event) => {
    this.setState({ email: event.target.value });
  }
  onPasswordInput = (event) => {
    this.setState({ password: event.target.value });
  }
  onSignUp = () => {
    fetch('http://localhost:3000/signup', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.email === this.state.email) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else if (user === 'Please fill all required fields'){
          const msg = document.querySelector('#notify');
          msg.textContent = 'Please fill all required fields'
        } else {
          const msg = document.querySelector('#notify');
          msg.textContent = 'Email is already registered'
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
                <label className="db fw6 lh-copy f6" htmlFor="name">* Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-near-white hover-near-black w-100 near-white" 
                  type="email" 
                  name="name"  
                  id="name" 
                  onChange={this.onNameInput}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">* Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-near-white hover-near-black w-100 near-white" 
                  type="email" 
                  name="email"  
                  id="email" 
                  onChange={this.onEmailInput}
                />
              </div>
              <div className="mv3"> 
                <label className="db fw6 lh-copy f6" htmlFor="password">* Password</label>
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
                      value="Sign up" 
                      // onClick={() => this.props.onRouteChange('signin')}
                      onClick={this.onSignUp}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
};

export default SignUp;