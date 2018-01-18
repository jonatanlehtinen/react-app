import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react';
import './App.css';
import DuckSightings from './DuckSightings.js';
import ReportSightingForm from './ReportSightingForm.js';
import MainHeader from './MainHeader.js'; 


/*
 * Main component
 */
class App extends Component {
  render() {
    return (
      <div>
        <MainHeader />
        <ReportSightingForm />
        <DuckSightings />
      </div>
    );
  }
}

export default App;
