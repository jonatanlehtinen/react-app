import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

/**
 * Button for sorting the sightings
 */
class DuckSightingsSortButton extends Component {
  constructor(props) {
    super(props)
    
    //Define different texts for states
    const sortDescendingText = "Sort by time in descending order";
    const sortAscendingText = "Sort by time in ascending order";
    
    //The sightings are initially sorted in ascending order so
    //use the sortAscendingText as an initial state
    this.state = {
      currentSortState: sortAscendingText,
      sortDescendingText: sortDescendingText,
      sortAscendingText: sortAscendingText
    }
    this.handleClick = this.handleClick.bind(this);
  }

  //Function for changing the text on the button and calling
  //the sort function
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
              className="content"
              bsStyle="primary">{this.state.currentSortState}</Button>
    );
  }
}


export default DuckSightingsSortButton;