import React, { useState, useEffect } from 'react';
import SideMenu from "./mypageside";
import '../../css/mywriting.css'
import '../../css/applygb.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
  const [isLogined, setIsLogined] = useState(window.sessionStorage.getItem('userId'))
  const [testStr, setTestStr] = useState('');

  function callback(str) {
    setTestStr(str);
  }

  useEffect(
    () => {
      axios({
        url: '/mypage/mypost',
        method: 'GET',
        params: {
          userId: window.sessionStorage.getItem('userId')
        },
      }).then((res) => {
        callback(res.data);
      })
    }, []
  );

   function goGb(productId){
    var answer;
    answer = window.confirm(`공동구매를 진행하시겠습니까?`);

    if (answer == true) {
    axios({
      url: `/mypage/mypost/${productId}/proceed`,
      method: 'post',
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then(function () {
      window.location.reload();
    }).catch(error => {
      console.log(error.response)
    });
   }}
   
  return (
    <div>
      <CardHeader className="border-0">
        <h3 className="mb-1 mt-1" id="tableTitle"><CreateIcon id="createIcon" />작성한 글</h3>
      </CardHeader>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <thead className="thead-light" id="mywriteTitle">
            <tr>
              <th scope="col" width="20%">기간</th>
              <th scope="col" width="10%">카테고리</th>
              <th scope="col" width="25%">제목</th>
              <th scope="col" width="10%">목표</th>
              <th scope="col">신청자</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>

          <TableBody>
            {Object.values(testStr).map(product => (
              <TableRow key={product.postId} hover>
                <td align="center" >{moment(product.rgstAt).format('YYYY-MM-DD')} ~ {moment(product.deadline).format('MM-DD')}</td>
                <td align="center">{product.category2.name}</td>
                <a href={`/gb/gbdetail/${product.postId}`}><td align="center" id="titleTexts">{product.title}</td></a>
                <td align="center">{product.matching}명</td>
                <Link to={`/mypage/reqList/${product.postId}`}>
                  <td align="center"><button className="reqListCheck">확인하기</button></td>
                </Link>
                <td align="right">{product.step} <button className="reqRate">평점</button></td>
                <td align="right">{product.step == "request" && <button className="reqRate" id="goGb" onClick={() => goGb(product.postId)}>공구 진행하기</button>}</td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}

export default function mywriting() {
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


