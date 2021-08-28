import React, { useState, useEffect } from 'react';
import '../../css/post.css'
import '../../css/gblist.css'
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles, } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
// import productsData from "../ProductData";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

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


 function Board() {
   const classes = useStyles();

   const [testStr, setTestStr] = useState('');

   function callback(str) {
     setTestStr(str);
   }

   useEffect(
     () => {
       axios({
         url: `/post/timesort`,
         method: 'GET'
       }).then((res) => {
         callback(res.data);
       })
     }, []
   );

  //  const [testStrSort1, setTestStrSort1] = useState('');

  //  function callback(str) {
  //   setTestStrSort1(str);
  //  }

  //  useEffect(
  //    () => {
  //      axios({
  //        url: `/post/timesort`,
  //        method: 'GET'
  //      }).then((res) => {
  //        callback(res.data);
  //      })
  //    }, []
  //  );

  function Sorting(){
    useEffect(
      () => {
        axios({
          url: `/post/matchingsort`,
          method: 'GET'
        }).then((res) => {
          callback(res.data);
        })
      }, []
    );
  }

   function ChangeFunc() {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    
    if(selectedValue == 2){
      Sorting()
    }
   }

   const products = Object.values(testStr).map(product => {
      let rgst = product.rgstAt;
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
         <select id="selectBox" onChange={ChangeFunc}>
           <option value="1" selected>최신등록순</option>
           <option value="2">참가인원 적은순</option>
         </select>
         <hr />
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
