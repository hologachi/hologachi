import React, { useState, useEffect } from 'react';
import SideMenu from "./mypageside";
import '../../css/mywriting.css'
import '../../css/applygb.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
// import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
// import productsData from "../ProductData";
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


// const { SearchBar } = Search;

// const productFormatter = () => {
//   const products = productsData.map(product => {
//   return (
//     <Link to={`/gb/gbdetail/${product.id}`}>상세보기</Link>
//   );
// });
// return(
//   <div>
//  {products}
//   </div>

// )
// }

// class Board extends React.Component{

//   columns = [{
//     dataField: 'id',
//     text: 'id',
//     hidden: true,
//   }, {
//     dataField: 'startdate',
//     text: '작성',
//     sort: true,
//     headerStyle: () => {
//       return { width: "13%" };
//     }
//   },{
//     dataField: 'finishdate',
//     text: '마감',
//     sort: true,
//     headerStyle: () => {
//       return { width: "13%" };
//     }
//   },{
//     dataField: 'category',
//     text: '카테고리',
//     headerStyle: () => {
//       return { width: "15%" };
//     }
//   }, {
//     dataField: 'title',
//     text: '제목',
//   }, {
//     dataField: 'goalnum',
//     text: '인원',
//     headerStyle: () => {
//       return { width: "13%" };
//     }
//   }, {
//     dataField: 'status',
//     text: '진행상황',
//     headerStyle: () => {
//       return { width: "13%" };
//     },
//   },{
//     dataField: 'follow',
//     text: '',
//     headerStyle: () => {
//       return { width: "13%" };
//     },
//     formatter: productFormatter
//   }];

//   render() {
//     return (
//       <div className="container py-4">

// <div className="row align-items-md-stretch">
//   <div className="col-lg-12 py-2">
//     <div className=" h-100 p-5 bg-light border shadow rounded" id="page_title">
//       작성한 글
//     </div>
//   </div>
// </div>

    //   <div className="row align-items-md-stretch">
    //     <div className="col-lg-2 py-2">
    //       <div className=" h-100 p-2 bg-light border shadow rounded" id="page_menu">
    //         <SideMenu />
    //       </div>
    //     </div>
    //     <div className="col-lg-10 py-2">
    //       <div className=" h-100 p-5 bg-light border shadow rounded" id="boottable">
    //       <ToolkitProvider
    //       bootstrap4
    //       keyField="id"
    //       data={productsData}
    //       columns={this.columns}
    //       search
    //     >
    //       {props => (
    //         <div>
            // <SearchBar 
            //     {...props.searchProps}
            //     style={{ width: "300px", height: "40px" }}
            //   />
    //           <BootstrapTable
    //             {...props.baseProps}
    //             filter={filterFactory()}
    //             noDataIndication="There is no solution"
    //             hover
    //             deleteRow
    //             pagination={paginationFactory({ sizePerPage: 10, display:'flex'}) }
    //           />
    //         {/* <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory({ sizePerPage: 10, display:'flex'})}/> */}
    //         </div>
    //       )}
    //     </ToolkitProvider>
    //       </div>
    //     </div>
    //   </div>
    // </div>
//     )
//   }
// }

// function mywriting() {
//     return (
//       <div className="Mywriting">
//         <div className="mywriting__body">
//           <Board/>
//           <div style={{clear:"both"}}></div>
//         </div>
//       </div>

//      )
//  }
//  export default mywriting

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
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(testStr).map(product => (
              <TableRow key={product.postId} hover>
                <StyledTableCell align="center">{moment(product.rgst_at).format('YYYY-MM-DD')} ~ {moment(product.deadline).format('MM-DD')}</StyledTableCell>
                <StyledTableCell align="center">{product.category2.name}</StyledTableCell>
                <Link to={`/gb/gbdetail/${product.postId}`}>
                  <StyledTableCell align="center" id="titleText">{product.title}</StyledTableCell>
                </Link>
                <StyledTableCell align="center">{product.matching}명</StyledTableCell>
                <Link to={`/mypage/reqList/${product.postId}`}>
                <StyledTableCell align="center"><button>확인하기</button></StyledTableCell>
                </Link>
                <StyledTableCell align="center">{product.step}</StyledTableCell>
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
