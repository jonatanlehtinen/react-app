import React, { Component } from 'react';
import DuckSightingsList from './DuckSightingsList.js';
import DuckSightingsSortButton from './DuckSightingsSortButton.js';
import DuckSightingsHeader from './DuckSightingsHeader.js';
import Sighting from './Sighting.js';
import { config } from './config';


/**
 * High-level component for the sightings. Includes functions for
 * sorting the sightings and requesting sightings from the API
 */
class DuckSightings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightings: []
    }
    this.sortDescending = this.sortDescending.bind(this);
    this.sortAscending = this.sortAscending.bind(this);
  }

  //Make GET request to fetch the sightings from the API
  componentDidMount() {
    fetch(config.apiUrl + config.apiSightingsPath)
    .then((result) => {
      return result.json();
    }).then((json) => {

      //for each of the fetched sightings, create Sighting component
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
      //Initially sort in the descending order
      this.sortDescending();
    });
  }

  //Function for sorting the sightings in the descending order
  //NOTE that the used sorting algorithm is insertion sort(O(n^2)),
  //so it get's very slow when the amount of sightings is increased.
  //This algorithm was implemented because of it's simplicity
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

  //Function for sorting the sightings in the ascending order
  //NOTE that the used sorting algorithm is insertion sort(n^2),
  //so it get's very slow when the amount of sightings is increased.
  //This algorithm was implemented because of it's simplicity
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
      <DuckSightingsList sightings={this.state.sightings} />
      </div>
    );
  }
}


export default DuckSightings;