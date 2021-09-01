import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core';
import '../../css/post.css'
//import productsData from "../ProductData";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'moment';

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

  const [ testStr, setTestStr ] = useState('');

  function callback(str) {
    setTestStr(str);
  }

  useEffect(
      () => {
        axios({
            url: '/home',
            method: 'GET'
        }).then((res) => {
            callback(res.data);
        })
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
    <span id="itemRecom">🎁추천하는 공동구매<hr /></span>
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