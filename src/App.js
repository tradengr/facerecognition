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
    //////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    /////////////////////////////////////////////////////////////////////////////////////////

    const USER_ID = 'tradengr';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '0e0879a68c534882a070f31041143d1f';
    const APP_ID = 'my-first-application';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = this.state.imageUrl;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

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

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.user.id})
          })
            .then(res => res.json())
            .then(data => this.setState(Object.assign(this.state.user, { imageDetected: data })))
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
    this.setState({ imageUrlDetected: '' }) 
  }

  render() {
    const { route, box, imageUrlDetected } = this.state;
    return (
      <div>
        <ParticlesBg type='cobweb' bg={true} color='999999' num={200} />
        <Navigation onRouteChange={this.onRouteChange} route={route} />
        { route === 'signin'
            ? <>
                <Logo />
                <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              </>
            : route === 'home'
            ? <>
                <Logo />
                <StatusBar userName={this.state.user.name} imageDetected={this.state.user.imageDetected} />
                <LinkForm onLinkChange={this.onLinkChange} onDetect={this.onDetect} />
                <FaceRecognition imageUrlDetected={imageUrlDetected} box={box} />
              </>
            : route === 'signup'
            ? <SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Logo />
        }
      </div>
    );
  }
}

export default App;

