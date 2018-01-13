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

  /**
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
 */

  render() {
    return (
      <ul>{this.props.sightings}</ul>
    );
  }
}

class DuckSightingsSortButton extends Component {
  constructor(props) {
    super(props)
    const sortDescendingText = "Sort by time in descending order";
    const sortAscendingText = "Sort by time in ascending order";
    this.state = {
      currentSortState: sortAscendingText,
      sortDescendingText: sortDescendingText,
      sortAscendingText: sortAscendingText
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const currentState = this.state.currentSortState;
    const sortDescendingText = this.state.sortDescendingText;
    const sortAscendingText = this.state.sortAscendingText;
    if (currentState === sortDescendingText) {
      this.setState({currentSortState: sortAscendingText});
      this.props.sortDescending();
    }
    else if (currentState === sortAscendingText) {
      this.setState({currentSortState: sortDescendingText});
      this.props.sortAscending();
    }
  }

  render() {
    return (
      <Button onClick={this.handleClick}
              bsStyle="primary">{this.state.currentSortState}</Button>
    );
  }
}

class DuckSightingsHeader extends Component {
  render() {
    return (
      <h2>Sightings</h2>
    );
  }
}

class DuckSightings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightings: []
    }
    this.sortDescending = this.sortDescending.bind(this);
    this.sortAscending = this.sortAscending.bind(this);
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
          key = {sighting.id}
          />
        );
      });
      this.setState({sightings: sightingsList})
      this.sortDescending();
    });
  }

  sortDescending() {
    const toBeSortedSightings = [].concat(this.state.sightings);
    const len = toBeSortedSightings.length;
    for (var i = 1; i < len; i++) {
      const tmp = toBeSortedSightings[i];
      const tmpTime = tmp.props.time
      for (var j = i - 1; j >= 0 && (toBeSortedSightings[j].props.time < tmpTime); j--) {
        toBeSortedSightings[j + 1] = toBeSortedSightings[j];
      }
      toBeSortedSightings[j + 1] = tmp;
    }
    this.setState({sightings: toBeSortedSightings});
  }

  sortAscending() {
    const toBeSortedSightings = [].concat(this.state.sightings);
    const len = toBeSortedSightings.length;
    for (var i = 1; i < len; i++) {
      const tmp = toBeSortedSightings[i];
      const tmpTime = tmp.props.time
      for (var j = i - 1; j >= 0 && (toBeSortedSightings[j].props.time > tmpTime); j--) {
        toBeSortedSightings[j + 1] = toBeSortedSightings[j];
      }
      toBeSortedSightings[j + 1] = tmp;
    }
    this.setState({sightings: toBeSortedSightings});
  }

  render() {
    return (
      <div>
      <DuckSightingsHeader />
      <DuckSightingsSortButton 
        sortDescending = {this.sortDescending}
        sortAscending = {this.sortAscending}
      />
      <DuckSightingsList sightings={this.state.sightings}/>
      </div>
    );
  }
}

class ReportSightingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateTimeValue: '',
      acceptedSpecies: [],
      speciesValue: '',
      descriptionValue: '',
      countValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
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
    const currentValue = this.state.speciesValue.toLowerCase();
    const acceptedSpecies = this.state.acceptedSpecies
    if (currentValue.length === 0) return null;
    if (acceptedSpecies.includes(currentValue)) return 'success';
    else return 'error'
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  validateForm(event) {
    if (this.getSpeciesValidationState() === "success"){
      fetch('http://localhost:8081/sightings', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "dateTime": this.state.dateTimeValue + "Z",
          "species": this.state.speciesValue.toLowerCase(),
          "description": this.state.descriptionValue,
          "count": this.state.countValue
        })
      });
    }
    else {
      event.preventDefault();
      alert("The species is not valid. Currently accepted species: " + 
            this.state.acceptedSpecies);
    }
  }

  render() {
    return (
      <div>
        <h1>Report new sighting</h1>
        <Form onSubmit={this.validateForm} inline>
          <FormGroup controlId="reportFormTime">
            <ControlLabel>Date and  time</ControlLabel> {' '}
            <FormControl 
              name="dateTimeValue"
              type="datetime-local" 
              required="true"
              value={this.state.dateTimeValue}
              onChange={this.handleChange}
            />
          </FormGroup>{' '}
          <FormGroup 
            controlId="reportFormSpecies"
            validationState={this.getSpeciesValidationState()}
          >
            <ControlLabel>Species</ControlLabel>{' '}
            <FormControl 
              name="speciesValue"
              type="textarea" 
              required="true"
              value={this.state.speciesValue}
              onChange={this.handleChange}
          />
          </FormGroup>{' '}
          <FormGroup controlId="reportFormDescription">
            <ControlLabel>Description</ControlLabel>{' '}
            <FormControl 
              name="descriptionValue"
              type="textarea"
              required="true"
              value={this.state.descriptionValue}
              onChange={this.handleChange}
            />
          </FormGroup>{' '}
          <FormGroup controlId="reportFormCount">
            <ControlLabel>Count</ControlLabel>{' '}
            <FormControl 
              name="countValue"
              type="number"
              min="1"
              required="true"
              value={this.state.countValue}
              onChange={this.handleChange}
            />
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
       <PageHeader>Duck Sightings</PageHeader>
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
