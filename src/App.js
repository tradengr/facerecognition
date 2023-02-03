import './App.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import LinkForm from './components/Linkform';
import StatusBar from './components/StatusBar';
import { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div>
        <ParticlesBg type='cobweb' bg={true} color='999999' num={200} />
        <Navigation />
        <Logo />
        <StatusBar />
        <LinkForm />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
