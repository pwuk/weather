import React, { Component } from 'react';
import './App.css';
import Weather from './Weather';
import Constants from './Constants';

class App extends Component {

  render() {
	  return (
	      <div className="App">
            <div className="App-header">
              <h2>Five Day {Constants.LOCATION_NAME} Weather Data</h2>
            </div>
	        <Weather />
	      </div>
	  );
  }
}

export default App;
