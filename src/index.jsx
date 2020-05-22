import React, {Component} from 'react';
import ReactDOM from 'react-dom';



// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';


import { createStore } from 'redux';
import { Provider } from 'react-redux';
import interfaceApp from './reducers/reducers';

import 'bootstrap/dist/css/bootstrap.min.css';


import  MainView  from './components/main-view/main-view';




const store = createStore(interfaceApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



// Main component (will eventually use all the others)
class FraaiApp extends React.Component {



    constructor() {
        super();
        this.state = { isSignedIn: false,
                user:null
        };
        // code executed right when the component is created in the memory
      }  

        
    componentDidMount=  () => {
     
    };
      
    




  render() {
    return (
      <Provider store={store}>
        <MainView/>
        </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(FraaiApp), container);