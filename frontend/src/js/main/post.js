import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core';
import '../../css/post.css'
//import productsData from "../ProductData";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.REACT_APP_API_LOC_KEY;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    width: '300px',
    height: '200px'
  },
}));

export default function Post() {
  const classes = useStyles();
  const [testStr, setTestStr] = useState('');
  const [locStr, setLocStr] = useState('');

  function callback(str) {
    setTestStr(str);
  }

  // useEffect(
  //   () => {
  //     axios({
  //       url: '/home',
  //       method: 'GET'
  //     }).then((res) => {
  //       callback(res.data);
  //     })
  //   }, []
  // );

  
  var geolocation = require('geolocation')

  geolocation.getCurrentPosition(function (err, position) {
    if (err) throw err
    let latitude = position.coords.latitude
    let longtitude = position.coords.longitude
    GetLoc(latitude, longtitude)
  })
  function GetLoc(lat, lon) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}2&key=${API_KEY}`)
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        const currentLoc = document.querySelector('#currentLoc')
        let loc = json.results[4].formatted_address;
        const locs = loc.split(' ');
        axios({
          url: `/home/${locs[3]}`,
          method: 'GET'
        }).then((res) => {
          callback(res.data);
        })
        // console.log(locs[3]);
        let location = `<span>${locs[3]}</span>`;
        currentLoc.innerHTML = location
      }).catch(error => console.log('error', error));
  }

  useEffect(
    () => {
     
    }, []
  );


  const products = Object.values(testStr).map(product => {
    let rgst = product.rgstAt;
    let rgst_result = moment(rgst).format('YYYY-MM-DD');
    let deadLine = product.deadline;
    let deadLinet_result = moment(deadLine).format('YYYY-MM-DD');
    let i = 0;

    return (
      <div key={product.postId}>
        <Grid item key={product.postId} item xs={12} id="grid">
          <Card className={classes.products} id="card">
            <Link to={`/gb/gbdetail/${product.postId}`}>
              <CardMedia
                className={classes.cardMedia}
                image={product.image}
                title={product.title}
              />
            </Link>
            <CardContent className={classes.cardContent}>
              <Typography id="status">
                {product.step}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>
                가격: {product.price}원
              </Typography>
              <Typography>
                목표: {product.matching} 명
              </Typography>
              <Typography>
                {rgst_result} ~ {deadLinet_result}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <hr />
      </div>
    );
  }
  );
  return (
    <div>
      <span id="itemRecom"><span id="currentLoc"></span> 추천하는 공동구매🎁<hr /></span>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}
          container justifyContent="center"
        >
          {products}
        </Grid>
      </Container>
    </div>
  )
}