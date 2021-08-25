import React, { useState, useEffect } from 'react';
import SideMenu from "./mypageside";
import '../../css/mywriting.css'
import '../../css/applygb.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
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
// import filterFactory from "react-bootstrap-table2-filter";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from "react-bootstrap-table2-paginator";
// import productsData from "../ProductData";
// import { Link } from "react-router-dom";

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
//     dataField: 'date',
//     text: '신청일',
//     sort: true,
//     headerStyle: () => {
//       return { width: "13%" };
//     }
//   }, {
//     dataField: 'category',
//     text: '카테고리',
//     headerStyle: () => {
//       return { width: "15%" };
//     }
//   }, {
//     dataField: 'title',
//     text: '제목',
//   }, {
//     dataField: 'proposer',
//     text: '제안자',
//     headerStyle: () => {
//       return { width: "15%" };
//     }
//   }, {
//     dataField: 'status',
//     text: '진행상황',
//     headerStyle: () => {
//       return { width: "13%" };
//     }
//   },{
//     dataField: 'follow',
//     text: '',
//     headerStyle: () => {
//       return { width: "13%" };
//     },
//     formatter: productFormatter
//   }
// ];

//   render() {
//     return (
//       <div className="container py-4">

//       <div className="row align-items-md-stretch">
//         <div className="col-lg-12 py-2">
//           <div className=" h-100 p-5 bg-light border shadow rounded" id="page_title">
//             신청한 글
//           </div>
//         </div>
//       </div>

//       <div className="row align-items-md-stretch">
//         <div className="col-lg-2 py-2">
//           <div className=" h-100 p-2 bg-light border shadow rounded" id="page_menu">
//             <SideMenu />
//           </div>
//         </div>
//         <div className="col-lg-10 py-2">
//           <div className=" h-100 p-5 bg-light border shadow rounded" id="boottable">
//           <ToolkitProvider
//           bootstrap4
//           keyField="id"
//           data={productsData}
//           columns={this.columns}
//           search
//         >
//           {props => (
//             <div>
//             <SearchBar 
//                 {...props.searchProps}
//                 style={{ width: "300px", height: "40px" }}
//               />
              
//               <BootstrapTable
//                 {...props.baseProps}
//                 filter={filterFactory()}
//                 noDataIndication="There is no solution"
//                 hover
//                 deleteRow
//                 pagination={paginationFactory({ sizePerPage: 10, display:'flex'}) }
//               />
//             </div>
//           )}
//         </ToolkitProvider>
//           </div>
//         </div>
//       </div>
//     </div>
//     )
//   }
// }


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
            url: '/mypage/mycomment',
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
            <TableRow className="table_box">
              <StyledTableCell sortDirection align="center" width="26%">날짜</StyledTableCell>
              <StyledTableCell align="center">글 제목</StyledTableCell>
              <StyledTableCell align="center">댓글</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Object.values(testStr).map(product => (
              <TableRow key={product.postId} hover>
                <StyledTableCell align="center">{moment(product.rgst_at).format('YYYY-MM-DD')}</StyledTableCell>
                <Link to={`/gb/gbdetail/${product.post.postId}`}>
                <StyledTableCell align="center">{product.post.title}</StyledTableCell>
                </Link>
                <StyledTableCell align="center">{product.content}</StyledTableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
      
   );
}

export default function comment(){
  return (
    <div className="container py-4">
    <div className="row align-items-md-stretch">
      <div className="col-lg-12 py-2">
        <div className=" h-100 p-5 bg-light border shadow rounded" id="page_title">
          나의 댓글
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
        <Mypost></Mypost>
        </div>
      </div>
    </div>
  </div>
  )
}
