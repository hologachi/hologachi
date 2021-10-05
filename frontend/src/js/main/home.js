import React from 'react'
import Feed from "./feed"
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from "./post"
import dotenv from "dotenv";
dotenv.config();

// const API_KEY = `${process.env.REACT_APP_LOCATION_KEY}`;
const API_KEY ="AIzaSyBvBhrhLvIwa2ytO9wOfmwHJYBwdZOK740"

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
