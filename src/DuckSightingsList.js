import React, { Component } from 'react';

/**
 * This component includes all the sightings and lists them
 */
class DuckSightingsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sightings: []
    }
  }

  render() {
    return (
      <ul className="content">{this.props.sightings}</ul>
    );
  }
}


export default DuckSightingsList;