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
  const list = [
    {
      id:1,
      image: "https://i.postimg.cc/9FhJcFSm/images.jpg"
    },{
      id:2,
      image: "https://i.postimg.cc/3rPs3558/image.jpg"
    },{
      id:3,
      image: "https://i.postimg.cc/cHtFzCJQ/17465-15308-5010.jpg"
    },{
      id:4,
      image: "https://i.postimg.cc/wBy5qPdz/215024402692.jpg"
    }
  ]

  const products = Object.values(testStr).map(product => {
    let rgst = product.rgst_at;
    let rgst_result = moment(rgst).format('YYYY-MM-DD');
    let deadLine = product.deadline;
    let deadLinet_result = moment(deadLine).format('YYYY-MM-DD');

    return (
      <div key={product.postId}>
      <Grid item key={product.postId} item xs={12} id="grid">
      <Card className={classes.products} id="card">
          <Link to={`/gb/gbdetail/${product.postId}`}>
          <CardMedia
                className={classes.cardMedia}
                image={list[product.postId-1].image}
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
  });
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}
      container justifyContent="center" 
      > 
          {products}
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