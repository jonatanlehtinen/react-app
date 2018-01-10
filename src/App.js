import React, { Component } from 'react';
import {PageHeader} from 'react-bootstrap';
import './App.css';


function Sighting(props) {
  return (
    <div>
      <h4>{props.time}</h4>
      <h5>{props.species}</h5>
      <h5>{props.description}</h5>
      <h5>{props.count}</h5>
    </div>
  );
}

class DuckSightingsList extends Component {
  render() {
    const sightings = [];
    this.props.sightings.forEach((sighting) => {
       sightings.push(
         <Sighting
         time="10.1.2018" 
         species = "duck"
         description = "weird"
         count = "100" />
       );
    });
    return (
      <ul>
        {sightings}
      </ul>
    );
  }
}

class DuckSightingsSortButton extends Component {
  render() {
    return (
      <h3>Here's the sort button</h3>
    );
  }
}

class DuckSightingsHeader extends Component {
  render() {
    return (
      <h2>Header for the sightings</h2>
    );
  }
}

class DuckSightings extends Component {
  render() {
    return (
      <div>
      <DuckSightingsHeader />
      <DuckSightingsSortButton />
      <DuckSightingsList sightings={["2", "sd"]}/>
      </div>
    );
  }
}

class ReportSightingForm extends Component {
  render() {
    return (
      <h1>The form will go here</h1>   
    );
  }
}

class MainHeader extends Component {
  render() {
    return (
       <PageHeader>This is the main header</PageHeader>
    );
  }
}


class DuckSightingsTable extends Component {
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


class App extends Component {
  render() {
    return (
      <DuckSightingsTable />
    );
  }
}

export default App;
