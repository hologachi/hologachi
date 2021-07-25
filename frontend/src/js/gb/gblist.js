import React from 'react'
import Header from "../main/header";
import Footer from "../main/footer";
import '../../css/post.css'
import '../../css/gblist.css'
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles, } from '@material-ui/core';
import { Form, Pagination } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

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
      category: '스포츠',
      price: '$49.99',
      personnel: 7,
      name: 'Football',
      date: '~21/07/18',
      status: "진행중"
    },
    {
      id: 1,
      image: "https://i.postimg.cc/CL7k7w19/image.jpg",
      category: '전자제품',
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
    {
        id: 3,
        image: "https://i.postimg.cc/tCjNDrzn/image.jpg",
        category: '식품',
        price: '$2.99',
        personnel: 10,
        name: '신 라면',
        date: '~21/07/30',
        status: "모집중"
      },
      {
        id: 4,
        image: "https://i.postimg.cc/CL7k7w19/image.jpg",
        category: '전자제품',
        price: '$2.99',
        personnel: 3,
        name: '아이폰',
        date: '~21/07/31',
        status: "모집중"
      },
  ];

  const sortProducts = ["최신 등록순","공구 마감일순","인기순"]

  function move() {
    window.location.href = "/"
  }

  const sortProduct = sortProducts.map((label, index) => (<option key={index}>{label}</option>));

 function Board() {
    const classes = useStyles();
  
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
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}><hr />
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
            <Header />
            <div className="gblist__body">
                <Board />
                <Paginate />
            </div>
            <Footer id="footerW" />
        </div>
    )
}

export default gblist
