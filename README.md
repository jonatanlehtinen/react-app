# Simple React application

### Description

This application is a simple single-page React application that can be used to display duck sightings and to report new duck sightings. When initialized, it fetches all the available sightings from API and displays those sightings. When reporting new sightings, the app will validate the input followingly:

* All the fields are required
* App fetches available species from API when initialized and the input species must be included to these fetched species

In case the input is valid, it will be posted to the API.


### Running the application

You first have to clone and start the API:

    git clone https://github.com/Vincit/summer-2018
    cd summer-2018
    npm start

Then you can clone this application and run it:

    git clone https://github.com/joppeel/react-app
    cd react-app
    npm start
