import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react';
import { PageHeader, 
         Form,
         FormGroup,
         ControlLabel,
         FormControl,
         Button } from 'react-bootstrap';
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
      sightings: []
    }
  }

  componentDidMount() {
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
      <ul>{this.state.sightings}</ul>
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
      <DuckSightingsList />
      </div>
    );
  }
}

class ReportSightingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      acceptedSpecies: [],
      speciesValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
}

  componentDidMount() {
    fetch('http://localhost:8081/species')
    .then((result) => {
      return result.json();
    }).then((result) => {
      const species = [];
      result.forEach((element) => {
        species.push(element.name);
      });
      this.setState({acceptedSpecies: species})
    });
  }

  getSpeciesValidationState() {
    const currentValue = this.state.speciesValue
    const acceptedSpecies = this.state.acceptedSpecies
    if (acceptedSpecies.includes(currentValue)) return 'success';
    else return 'error'
  }

  handleChange(event) {
    this.setState({ speciesValue: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Report new sighting</h1>
        <Form inline>
          <FormGroup controlId="reportFormTime">
            <ControlLabel>Datetime</ControlLabel> {' '}
            <FormControl type="datetime-local" />
          </FormGroup>{' '}
          <FormGroup 
            controlId="reportFormSpecies"
            validationState={this.getSpeciesValidationState()}
          >
            <ControlLabel>Species</ControlLabel>{' '}
            <FormControl 
              type="textarea" 
              value={this.state.speciesValue}
              onChange={this.handleChange}
          />
          </FormGroup>{' '}
          <FormGroup controlId="reportFormCount">
            <ControlLabel>Count</ControlLabel>{' '}
            <FormControl type="number" />
          </FormGroup>{' '}
          <FormGroup controlId="reportFormDescription">
            <ControlLabel>Textarea</ControlLabel>{' '}
            <FormControl type="textarea" />
          </FormGroup>{' '}
          <Button type="submit">Report sighting</Button>
        </Form>
      </div>
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
