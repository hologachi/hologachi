import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import '../../css/mywriting.css'
import '../../css/applygb.css'
import '../../css/reqList.css'
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
  const { productId } = useParams();
  const classes = useStyles();

  const [testStr, setTestStr] = useState('');
  // console.log(testStr);

  function ok(id, ptcptId) {
    var answer;
    var ok = id + "ok"
    var reject = id + "reject"
    var okId = document.getElementById(ok);
    var rejectId = document.getElementById(reject);

    answer = window.confirm(`수락하시겠습니까?`);
    if (answer == true) {
      axios({
        url: `/mypage/mypost/${productId}/${ptcptId}/agree`,
        method: 'post',
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then(function () {
        okId.innerHTML = "수락완료";
        okId.style.backgroundColor = "orange";
        okId.disabled = true;
        rejectId.remove();
      }).catch(error => {
        console.log(error.response)
      });

    }
  }

  function reject(id, ptcptId) {
    var answer;
    var ok = id + "ok"
    var reject = id + "reject"
    var okId = document.getElementById(ok);
    var rejectId = document.getElementById(reject);

    answer = window.confirm(`거절하시겠습니까?`);
    if (answer == true) {
      axios({
        url: `/mypage/mypost/${productId}/${ptcptId}/reject`,
        method: 'post',
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then(function () {
        rejectId.innerHTML = "거절완료";
      rejectId.disabled = true;
      okId.remove();
      }).catch(error => {
        console.log(error.response)
      });
    }
  }


  function callback(str) {
    setTestStr(str);
  }

  useEffect(
    () => {
      axios({
        url: `/mypage/mypost/${productId}`,
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
              <StyledTableCell align="center" >신청자</StyledTableCell>
              <StyledTableCell align="center" >제안자 평점</StyledTableCell>
              <StyledTableCell align="center" >신청자 평점</StyledTableCell>
              <StyledTableCell align="center" >-</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(testStr).map(product => (
              <TableRow key={product.ptcptId} hover>
                <Link to={`/mypage/mypost/${productId}/${product.ptcptId}`}>
                  <StyledTableCell align="center" id="titleText">{product.user.nickname}</StyledTableCell>
                </Link>
                <StyledTableCell align="center">{product.user.sgst_rate}</StyledTableCell>
                <StyledTableCell align="center">{product.user.rqst_rate}</StyledTableCell>
                <StyledTableCell align="center">
                {product.step=="agree" && <button id={product.user.userId + 'agree'} disabled>수락완료</button>}
                {product.step=="reject" && <button id={product.user.userId + 'reject'} disabled>거절완료</button>}
                {product.step=="request" &&  <div><button id={product.user.userId + 'ok'} onClick={() => ok(product.user.userId, product.ptcptId)} className="okbtn">수락</button><button id={product.user.userId + 'reject'} onClick={() => reject(product.user.userId, product.ptcptId)} className="rejectbtn">거절</button></div>}
                  </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default function reqList() {
  return (
    <div className="container py-4">
      <div className="row align-items-md-stretch">
        <div className="col-lg-12 py-2">
          <div className=" h-100 p-5 bg-light border shadow rounded" id="page_title">
            신청자 목록
          </div>
        </div>
      </div>
      <div className="row align-items-md-stretch">
        <Mypost />
      </div>
    </div>
  )
}
