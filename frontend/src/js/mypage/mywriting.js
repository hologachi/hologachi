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
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import moment from 'moment';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
            url: '/mypage/mypost',
            method: 'GET'
        }).then((res) => {
            callback(res.data);
        })
      }, []
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" width="15%">기간</StyledTableCell>
              <StyledTableCell align="center" width="8%">카테고리</StyledTableCell>
              <StyledTableCell align="center" width="30%">제목</StyledTableCell>
              <StyledTableCell align="center" width="15%">목표</StyledTableCell>
              <StyledTableCell align="center">신청자 목록</StyledTableCell>
              <StyledTableCell align="center" width="8%">진행상황</StyledTableCell>
              <StyledTableCell align="center" width="8%"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(testStr).map(product => (
              <TableRow key={product.postId} hover>
                <StyledTableCell align="center">{moment(product.rgstAt).format('YYYY-MM-DD')} ~ {moment(product.deadline).format('MM-DD')}</StyledTableCell>
                <StyledTableCell align="center">{product.category2.name}</StyledTableCell>
                <Link to={`/gb/gbdetail/${product.postId}`}>
                  <StyledTableCell align="center" id="titleTexts">{product.title}</StyledTableCell>
                </Link>
                <StyledTableCell align="center">{product.matching}명</StyledTableCell>
                <Link to={`/mypage/reqList/${product.postId}`}>
                <StyledTableCell align="center"><button id="reqListCheck">확인하기</button></StyledTableCell>
                </Link>
                <StyledTableCell align="center">{product.step}</StyledTableCell>
                <StyledTableCell align="center">{product.step} <button id="reqListCheck">평점</button></StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

   );
}

export default function mywriting(){
  return (
    <div className="container py-4">
    <div className="row align-items-md-stretch">
      <div className="col-lg-12 py-2">
        <div className=" h-100 p-5 bg-light border shadow rounded" id="page_title">
          작성한 글
        </div>
      </div>
    </div>

    <div className="row align-items-md-stretch">
      <div className="col-lg-2 py-2">
        <div className=" h-100 p-2 bg-light border shadow rounded" id="page_menu">
          <SideMenu />
        </div>
      </div>
      <div className="col-lg-10 py-2">
        <div className=" h-100 p-5 bg-light border shadow rounded" id="boottable">
        <Mypost/>
        </div>
      </div>
    </div>
  </div>
  )
}
