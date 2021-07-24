import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core';
import '../../css/post.css'

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

const products = [
  {
    id: 0,
    image: "https://i.postimg.cc/tT5w5HVn/football.jpg",
    category: 'Sporting Goods',
    price: '$49.99',
    personnel: 7,
    name: 'Football',
    date: '~21/07/18',
    status: "진행중"
  },
  {
    id: 1,
    image: "https://i.postimg.cc/CL7k7w19/image.jpg",
    category: 'Electronics',
    price: '$99.99',
    personnel: 5,
    name: '아이폰 12 미니',
    date: '~21/07/20',
    status: "모집중"
  },
  {
    id: 2,
    image: "https://i.postimg.cc/tCjNDrzn/image.jpg",
    category: '식품',
    price: '$1.99',
    personnel: 8,
    name: '신라면',
    date: '~21/07/20',
    status: "모집중"
  },
];

function move() {
  window.location.href = "/"
}

export default function Post() {
  const classes = useStyles();

  return (

    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card className={classes.product} onClick={move} id="card">
              <CardMedia
                className={classes.cardMedia}
                image={product.image}
                title={product.name}
              />
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
                  {product.personnel}
                </Typography>
                <Typography>
                  {product.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}