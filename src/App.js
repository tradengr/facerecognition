import './App.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import LinkForm from './components/Linkform';
import StatusBar from './components/StatusBar';
import { Component } from 'react';
import FaceRecognition from './components/FaceRecognition';

class App extends Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      imageUrlDetected: '',
      box: {}
    }
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
        // .then(result => this.displayFaceLocation(this.faceLocation(result.outputs[0].data.regions[0].region_info.bounding_box)))
        .then(result => this.setState({ box: this.faceLocation(result.outputs[0].data.regions[0].region_info.bounding_box) }))
        .catch(error => console.log('error', error));
  }

  faceLocation = (objLocation) => {
    const img = document.querySelector('#img');
    const width = Number(img.width);
    const height = Number(img.height);
    // return {
    //   leftCol: objLocation.left_col * width,
    //   topRow: objLocation.top_row * height,
    //   rightCol: width - (objLocation.right_col * width),
    //   bottomRow: height - (objLocation.bottom_row * height)
    // }
    return {
      leftCol: objLocation.left_col * width,
      topRow: objLocation.top_row * height,
      rightCol: width - (objLocation.right_col * width),
      bottomRow: height - (objLocation.bottom_row * height)
    }
  }

  // displayFaceLocation = (box) => {
  //   console.log(box)
  //   this.setState({box: box})
  // }

  render() {
    return (
      <div>
        <ParticlesBg type='cobweb' bg={true} color='999999' num={200} />
        <Navigation />
        <Logo />
        <StatusBar />
        <LinkForm onLinkChange={this.onLinkChange} onDetect={this.onDetect} />
        <FaceRecognition imageUrlDetected={this.state.imageUrlDetected} box={this.state.box} />
      </div>
    );
  }
}

export default App;
