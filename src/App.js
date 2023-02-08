import { Component } from 'react';
import './App.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import LinkForm from './components/LinkForm/Linkform';
import StatusBar from './components/StatusBar/StatusBar';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

class App extends Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      imageUrlDetected: '',
      route: 'signin',
      box: {},
      user: {
        id: '',
        name: '',
        email: '',
        imageDetected: '',
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      imageDetected: data.imageDetected,
      joined: data.joined
    }})
  }
  onLinkChange = (event) => {
    this.setState({ imageUrl: event.target.value });
  }
  onDetect = () => {
    this.setState({ imageUrlDetected: this.state.imageUrl })

    const USER_ID = 'tradengr';
    const PAT = '0e0879a68c534882a070f31041143d1f';
    const APP_ID = 'my-first-application';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = this.state.imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
          fetch('https://facerecognition-server-ynxi.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.user.id})
          })
            .then(res => res.json())
            .then(data => this.setState(Object.assign(this.state.user, { imageDetected: data })))
            .catch(console.log)
          this.setState({ box: this.faceLocation(result.outputs[0].data.regions[0].region_info.bounding_box) })})
        .catch(error => console.log('error', error));
  }

  faceLocation = (objLocation) => {
    const img = document.querySelector('#img');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol: objLocation.left_col * width,
      topRow: objLocation.top_row * height,
      rightCol: width - (objLocation.right_col * width),
      bottomRow: height - (objLocation.bottom_row * height)
    }
  }

  onRouteChange = (route) => {
    this.setState({ route: route })
    if (route === 'signin') {
      this.setState({
        imageUrl: '',
        imageUrlDetected: '',
        route: 'signin',
        box: {},
        user: {
          id: '',
          name: '',
          email: '',
          imageDetected: '',
          joined: ''
        }
      })
    }
  }

  render() {
    const { route, box, imageUrlDetected, user } = this.state;
    const { onRouteChange, loadUser, onLinkChange, onDetect } = this;
    return (
      <>
        <ParticlesBg type='cobweb' bg={true} color='999999' num={200} />
        <Navigation onRouteChange={onRouteChange} route={route} />
        { route === 'signin'
            ? <>
                <Logo />
                <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
              </>
            : route === 'home'
            ? <>
                <Logo />
                <StatusBar userName={user.name} imageDetected={user.imageDetected} />
                <LinkForm onLinkChange={onLinkChange} onDetect={onDetect} />
                <FaceRecognition imageUrlDetected={imageUrlDetected} box={box} />
              </>
            : route === 'signup'
            ? <SignUp onRouteChange={onRouteChange} loadUser={loadUser} />
            : <Logo />
        }
      </>
    );
  }
}

export default App;