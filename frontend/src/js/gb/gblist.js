import React from 'react'
import '../../css/post.css'
import '../../css/gblist.css'
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles, } from '@material-ui/core';
import { Form, Pagination } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
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

  const sortProducts = ["최신 등록순","공구 마감일순","인기순"]

  const sortProduct = sortProducts.map((label, index) => (<option key={index}>{label}</option>));

 function Board() {
    const classes = useStyles();

    const products = productsData.map(product => {
      return (
        <div key={product.id}>
        <Card className={classes.product} id="card">
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
        <div>
          <h2>공동구매</h2>
          <hr />
          <div id="category">
            <Form id="select">
              <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="select" name="sort">
                  {sortProduct}
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
        </div>
        
        <Grid container spacing={4}>
            <Grid item key={products.id} xs={12} sm={6} md={4}><hr />
              {products}
            </Grid>
        </Grid>
        <Paginate id="pagi"/>
      </Container>
    )
  }

  function Paginate(){
    return(
      <div id="pagination">
        <Container>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active >{1}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </Container>
      </div>
    )
  }

function gblist() {
    return (
        <div className="gblist">
            <div className="gblist__body">
                <Board />
            </div>
        </div>
    )
}

export default gblist
