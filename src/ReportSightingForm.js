import React, { Component } from 'react';
import { Form,
         FormGroup,
         ControlLabel,
         FormControl,
         Button} from 'react-bootstrap';
import { config } from './config.js'

/**
 * Form for reporting sightings. The user is required to input everything
 * and the species is validated i.e. it has to be included in the species 
 * that are accepted by the API. 
 */
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

  //Fetch the accepted species from the API
  componentDidMount() {
    fetch(config.apiUrl + config.apiSpeciesPath)
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

  //Function that is called when all the information is inputted
  //POSTs the inputted information to the API if the species is valid
  validateForm(event) {
    if (this.getSpeciesValidationState() === "success"){

      fetch(config.apiUrl + config.apiSightingsPath, {
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
      <div className="content">
        <h2>Report new sighting</h2>
        <Form onSubmit={this.validateForm} inline>
          <FormGroup controlId="reportFormTime">
            <ControlLabel>Date and time</ControlLabel> {' '}
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


export default ReportSightingForm;