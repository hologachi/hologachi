import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import '../../css/post.css'
import '../../css/gblist.css'
import { Container, Grid, Card, CardMedia, CardContent, Typography, makeStyles, } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import SearchIcon from '@material-ui/icons/Search';

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


function SearchList() {
    const { keyword } = useParams();

    console.log(keyword);
  const [title, setTitle] = useState('');
  const [testStr, setTestStr] = useState('');
  const classes = useStyles();

  function callback(str) {
    setTestStr(str);
    console.log(testStr);
    setFoundPosts(str);
    console.log(foundPosts);
  }

  useEffect(
    () => {
      axios({
        url: `/post/search/${keyword}`,
        method: 'GET'
      }).then((res) => {
        callback(res.data);
      })
    }, []
  );

  function Matchingsort(){
    const selectBox = document.getElementById('selectBox');
    if(selectBox.value==2){
      window.location.href="/gb/gblistMatching";
    }else{
      window.location.href="/gb/gblist";
    }
  }

  const [foundPosts, setFoundPosts] = useState(testStr);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = testStr.filter((user) => {
        return user.title.toString().toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      setFoundPosts(results);
    } else {
      setFoundPosts(testStr);
    }
    setTitle(keyword);
  };

  return (
    <Container className={classes.cardGrid} maxWidth="md">
    <div>
      <h2>검색 결과</h2>
      <hr />
    </div>
    <Grid container spacing={4}
    container justifyContent="center"
  >
        {foundPosts && foundPosts.length > -1 ? (
          foundPosts.map((product) => (
            <div className="MuGrid-root" item key={product.postId} item xs={12} id="grid">
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
                  시작: {moment(product.rgstAt).format('YYYY-MM-DD')}
                </Typography>
                <Typography>
                  마감: {moment(product.deadline).format('YYYY-MM-DD')}
                </Typography>
            </CardContent>
            </Card>
            </div>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
    </Grid>
    </Container>
  );
}

export default SearchList