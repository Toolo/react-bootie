import React, { Component } from 'react';
import { connect } from 'react-redux'
import Map from './Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Map />
      </div>
    );
  }
}

export default connect()(App);
