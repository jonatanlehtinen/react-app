import React, { Component } from 'react';


/**
 * Simple function for modifying the time to look prettier
 */
function PrettyTime(props) {

  const oldTime = props.time
  const indexOfT = oldTime.indexOf("T");
  const date = oldTime.slice(0, indexOfT);
  const time = oldTime.slice(indexOfT + 1, oldTime.length - 1);
  const newTime = date + ", " + time;

  return (
    <h4>{newTime}</h4>
  );
}

/**
 * Represents one sighting
 */
function Sighting(props) {
  return (
    <li>
      <div>
        <PrettyTime time={props.time} />
        <p>Species: {props.species}</p>
        <p>Description: {props.description}</p>
        <p>Count: {props.count}</p>
      </div>
    </li>
  );
}

export default Sighting;
