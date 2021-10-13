import React, { useState, useEffect } from 'react';
import SideMenu from "./mypageside";
import '../../css/mywriting.css'
import '../../css/applygb.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import moment from 'moment';
import { CardHeader } from "reactstrap";
import CreateIcon from '@mui/icons-material/Create';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Mypost() {
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
            url: '/mypage/myrequest',
            method: 'GET',
            params: {
              userId: window.sessionStorage.getItem('userId')
            },
        }).then((res) => {
            callback(res.data);
        })
      }, []
  );

  return (
    <div>
    <CardHeader className="border-0">
        <h3 className="mb-1 mt-1" id="tableTitle"><CreateIcon id="createIcon" />신청한 글</h3>
      </CardHeader>
          <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
        <thead className="thead-light" id="mywriteTitle">
            <tr>
              <th scope="col" width="18%">제안자</th>
              <th scope="col" width="10%">기간</th>
              <th scope="col" width="25%">제목</th>
              <th scope="col" width="10%">가격</th>
              <th scope="col">인원</th>
              <th scope="col">진행상황</th>
              <th scope="col">수락/거절</th>
            </tr>
          </thead>
          <TableBody>
          {Object.values(testStr).map(product => (
              <TableRow key={product.postId} hover>
              <a href={`/mypage/myrequest/sgstProfile/${product.post.user.userId}`}><td align="center" id="titleTexts">{product.post.user.nickname}</td></a>
                <td align="center">{moment(product.rgstAt).format('YYYY-MM-DD')} ~ {moment(product.deadline).format('MM-DD')}</td>
                <a href={`/gb/gbdetail/${product.post.postId}`}><td align="center">{product.post.title}</td></a>
                <td align="center">{product.post.price}원</td>
                <td align="center">{product.post.matching}명</td>
                <td align="center">{product.post.step}</td>
                <td align="center">{product.step}</td>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
      
   );
}

export default function applygb(){
  return (
    <div className="container py-4">
      <div className="row align-items-md-stretch">
        <div className="col-lg-2 py-2">
          <div className=" h-100 p-2 bg-light border shadow rounded" id="page_menu">
            <SideMenu />
          </div>
        </div>
        <div className="col-lg-10 py-2">
          <div className=" h-100 p-5 bg-light border shadow rounded" id="boottable">
            <Mypost />
          </div>
        </div>
      </div>
    </div>
  )
}
