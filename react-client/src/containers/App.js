import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Site from './Site/Site';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Site />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
