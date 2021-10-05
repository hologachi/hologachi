import React, { useState, useEffect } from 'react';
import SideMenu from "./mypageside";
import '../../css/mywriting.css'
import '../../css/applygb.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
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
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

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
            url: '/mypage/bookmark',
            method: 'GET',
            params: {
              userId: window.sessionStorage.getItem('userId')
            },
        }).then((res) => {
            callback(res.data);
        })
      }, []
  );

  function bookmarkDelete(id){
    console.log(id);
    var answer;
    answer = window.confirm(`북마크를 삭제 하시겠습니까?`);
  
    if (answer == true) {
      axios.post(`/mypage/bookmark/${id}/delete`);
      alert('삭제가 완료되었습니다.');
      window.location.href="/mypage/bookmark";
    }
  }

  return (
    <div>
     <CardHeader className="border-0">
        <h3 className="mb-1 mt-1" id="tableTitle"><LocalGroceryStoreIcon id="createIcon" />북마크</h3>
      </CardHeader>
          <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
        <thead className="thead-light" id="mywriteTitle">
            <tr>
              <th scope="col">제안자</th>
              <th scope="col">공구기간</th>
              <th scope="col">제목</th>
              <th scope="col">가격</th>
              <th scope="col">진행상황</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <TableBody>
          {Object.values(testStr).map(product => (
              <TableRow key={product.postId} hover>
              <td align="center">{product.post.user.nickname}</td>
                <td align="center">{moment(product.rgstAt).format('YYYY-MM-DD')} ~ {moment(product.deadline).format('MM-DD')}</td>
                <a href={`/gb/gbdetail/${product.post.postId}`}>
                <td align="center">{product.post.title}</td>
                </a>
                <td align="center">{product.post.price}원</td>
                <td align="center">{product.post.matching}명</td>
                <td align="center">{product.post.step}</td>
                <td align="center"><button onClick={()=> bookmarkDelete(product.bookmarkId)}>삭제</button></td>
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
