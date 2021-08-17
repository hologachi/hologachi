import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core';
import '../../css/post.css'
//import productsData from "../ProductData";
import { Link } from "react-router-dom";
import axios from "axios";


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

  // 요청받은 정보를 담아줄 변수 선언
  const [ testStr, setTestStr ] = useState('');
  // console.log(testStr);
  

  // 변수 초기화
  function callback(str) {
    setTestStr(str);
  }

  // 첫 번째 렌더링을 마친 후 실행
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
    return (
      <div key={product.postId}>
      <Card className={classes.products} id="card">
          <Link to={`/gb/gbdetail/${product.postId}`}>
          <CardMedia
                className={classes.cardMedia}
                image="https://i.postimg.cc/tT5w5HVn/football.jpg"
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
                  {product.price}
                </Typography>
                <Typography>
                  {product.matching}
                </Typography>
                <Typography>
                  {product.rgstAt}
                </Typography>
                <Typography>
                  {product.deadline}
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

// function App() {
//   // 요청받은 정보를 담아줄 변수 선언
//   const [ testStr, setTestStr ] = useState('');
//   console.log(testStr);

//   // 변수 초기화
//   function callback(str) {
//     setTestStr(str);
//   }

//   // 첫 번째 렌더링을 마친 후 실행
//   useEffect(
//       () => {
//         axios({
//             url: '/home',
//             method: 'GET'
//         }).then((res) => {
//             callback(res.data[0].postId);
//         })
//       }, []
//   );

//   return (
//       <div className="App">
//           <header className="App-header">
//               {testStr}
//           </header>
//       </div>
//   );
// }

// export default App;