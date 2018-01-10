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
  constructor(props) {
    super(props)
    this.state = {
      sightings: this.props.sightings
    }
    this.callApi();
  }

  callApi(){
    fetch('http://localhost:8081/sightings')
    .then((result) => {
      return result.json();
    }).then((json) => {
      const sightingsList = [];
      json.forEach((sighting) => {
        sightingsList.push(
          <Sighting
          time = {sighting.dateTime} 
          species = {sighting.species}
          description = {sighting.description}
          count = {sighting.count} 
          />
        );
      });
      this.setState({sightings: sightingsList})
    });
  }

  render() {
    return (
      <ul>
        {this.state.sightings}
      </ul>
    );
  }
}

class DuckSightingsSortButton extends Component {
  render() {
    console.log("asdf");
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
      <DuckSightingsList sightings = {[]}/>
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
