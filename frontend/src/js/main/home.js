import React from 'react'
import Feed from "./feed"
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from "./post"

const API_KEY = process.env.REACT_APP_LOCATION_KEY;
console.log(API_KEY);

function home() {
  var geolocation = require('geolocation')

geolocation.getCurrentPosition(function (err, position) {
    if (err) throw err
    let latitude = position.coords.latitude
    let longtitude = position.coords.longitude
    GetLoc(latitude,longtitude)
  })
  
  function GetLoc(lat, lon){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}2&key=${API_KEY}`)
    .then(function(response){
        return response.json();
    }).then(function(json){
      const loc = json;
      console.log(loc);
        // let detLoc = json.results[4].formatted_address;
        // let location = `<span>${detLoc}</span>`;
        // detailLoc.innerHTML = location
    }).catch(error => console.log('error', error));
  }
    return (
        <div className="Home">
            <div className="home__body">
                <Feed />
                <Post />
            </div>
        </div>
    )
}

export default home
