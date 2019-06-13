import React, { Component } from 'react';
import * as Constants from './Constants'
import Routes from './Routes'
import './css/bootstrap.min.css'
import './css/bootstrap.css'
import './css/matall.css';
import './css/transition.css'
class App extends Component {
  componentWillMount(){

   // Constants.url = 'http://dt-shwetak.technologic.com:7170/eQServiceGateway/API/cachemanagement/get/RedmineCache1/'
    Constants.url = 'http://localhost:7070/dailytasks/'
    //Constants.url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + '/PVPUI/'
    console.log("LOCATION PORT " + Constants.url)
    console.log("LOCATION PORT " + window.location.hostname)
  }
  render() {
    return (
       <div className="App stylesContainer">
        
       <Routes />

      </div>
    );
  }
}

export default App;
