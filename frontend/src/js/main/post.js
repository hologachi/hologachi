import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core';
import '../../css/post.css'
import productsData from "../ProductData";
import { Link } from "react-router-dom";

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
  },
}));

export default function Post() {
  const classes = useStyles();

  const products = productsData.map(product => {
    return (
      <div key={product.id}>
      <Card className={classes.products} id="card">
          <Link to={`/gb/gbdetail/${product.id}`}>
          <CardMedia
                className={classes.cardMedia}
                image={product.image}
                title={product.name}
              />
          </Link>
          <CardContent className={classes.cardContent}>
                <Typography id="status">
                  {product.status}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography>
                  {product.price}
                </Typography>
                <Typography>
                  {product.currentnum}/
                  {product.goalnum}
                </Typography>
                <Typography>
                  {product.startdate}
                </Typography>
                <Typography>
                  {product.finishdate}
                </Typography>
              </CardContent>
              </Card>
        <hr />
      </div>
    );
  });
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4} >
          <Grid item key={products.id} xs={12} sm={6} md={4} id="grid">
              {products}
          </Grid>
      </Grid>
    </Container>
  )
}