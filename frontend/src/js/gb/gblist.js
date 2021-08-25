import React, { useState, useEffect } from 'react';
import '../../css/post.css'
import '../../css/gblist.css'
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles, } from '@material-ui/core';
import { Form, Pagination } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import productsData from "../ProductData";
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

  const sortProducts = ["최신 등록순","공구 마감일순","인기순"]

  const sortProduct = sortProducts.map((label, index) => (<option key={index}>{label}</option>));

 function Board() {
   const classes = useStyles();

   // 요청받은 정보를 담아줄 변수 선언
   const [testStr, setTestStr] = useState('');
   console.log(testStr);

   // 변수 초기화
   function callback(str) {
     setTestStr(str);
   }

   // 첫 번째 렌더링을 마친 후 실행
   useEffect(
     () => {
       axios({
         url: `/post`,
         method: 'GET'
       }).then((res) => {
         callback(res.data);
       })
     }, []
   );

   const products = Object.values(testStr).map(product => {
      let rgst = product.rgst_at;
      let rgst_result = moment(rgst).format('YYYY-MM-DD');
      let deadLine = product.deadline;
      let deadLinet_result = moment(deadLine).format('YYYY-MM-DD');

      return (
        <div key={product.id}>
        <Grid item key={product.postId} item xs={12} id="grid">
        <Card className={classes.product} id="card">
            <Link to={`/gb/gbdetail/${product.postId}`}>
            <CardMedia
                  className={classes.cardMedia}
                  image={product.image}
                  title={product.name}
                />
            </Link>
            <CardContent className={classes.cardContent}>
                <Typography id="status">
                  {product.step}
                </Typography>
                <Typography id="gbTitle" gutterBottom variant="h5" component="h2">
                  {product.title}
                </Typography>
                <Typography>
                  가격: {product.price}원
                </Typography>
                <Typography>
                  목표: {product.matching}명
                </Typography>
                <Typography>
                  시작: {rgst_result}
                </Typography>
                <Typography>
                  마감: {deadLinet_result}
                </Typography>
              </CardContent>
              </Card>
              </Grid>
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
        
        <Grid container spacing={4}
      container justifyContent="center" 
      > 
          {products}
      </Grid>
      </Container>
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
