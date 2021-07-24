import React from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import SideMenu from "./mypageside";
import '../../css/mywriting.css'
import '../../css/applygb.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";


const { SearchBar } = Search;

// const ClearButton = props => {
//   const handleClick = () => {
//     props.onSearch("");
//     props.clearAllFilter();
//   };
//   return (
//     <Button
//       id="clearbtn"
//       variant="secondary"
//       onClick={handleClick}
//       style={{
//         fontSize: "16px",
//         padding: "5px",
//         margin: "10px",
//         height: "40px"
//       }}
//     >
//       clear
//     </Button>
//   );
// };

{/* <th scope="col">#</th> */}
//               <th scope="col">마감일</th>
//               <th scope="col">글 제목</th>
//               <th scope="col">카테고리</th>
//               <th scope="col">참여자 수</th>
//               <th scope="col">진행상황</th>

class Board extends React.Component{
  products = [
    {
      id: 0,
      date: '21/07/25',
      title: '닭가슴살 공동구매',
      comment: '무슨 라면인가요?',
    },
    {
      id: 1,
      date: '21/07/20',
      title: '양말 공동구매',
      comment: '알겠습니다',
    },
    {
      id: 2,
      date: '21/06/20',
      title: '아이폰 12 공동구매',
      comment: '끝났나요?',
    },
  ];

  columns = [{
    dataField: 'id',
    text: 'id',
    hidden: true,
  }, {
    dataField: 'date',
    text: '날짜',
    sort: true,
    headerStyle: () => {
        return { width: "15%" };
      }
  }, {
    dataField: 'title',
    text: '제목',
  }, {
    dataField: 'comment',
    text: '내가 단 댓글',
  },];
  
  render() {
    return (
      <div className="container py-4">

      <div className="row align-items-md-stretch">
        <div className="col-lg-12 py-2">
          <div className=" h-100 p-5 bg-light border shadow rounded" id="page_title">
            댓글 남긴 글
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
          <div className=" h-100 p-5 bg-light border shadow rounded">
          <ToolkitProvider
          bootstrap4
          keyField="id"
          data={this.products}
          columns={this.columns}
          search
        >
          {props => (
            <div>
            <SearchBar 
                {...props.searchProps}
                style={{ width: "300px", height: "40px" }}
              />
              <BootstrapTable
                {...props.baseProps}
                filter={filterFactory()}
                noDataIndication="There is no solution"
                hover
                pagination={paginationFactory({ sizePerPage: 10, display:'flex'}) }
              />
            {/* <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory({ sizePerPage: 10, display:'flex'})}/> */}
            </div>
          )}
        </ToolkitProvider>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
// class="list-group-item list-group-item-action disabled" 

// function Board() {
//     return (
//         <div className="container py-4">

//             <div className="row align-items-md-stretch">
//                 <div className="col-lg-12 py-2">
//                     <div className=" h-100 p-5 bg-light border shadow rounded" id="page_title">
//                         댓글 남긴 글
//                     </div>
//                 </div>
//             </div>

//             <div className="row align-items-md-stretch">

//                 <div className="col-lg-2 py-2">
//                     <div className=" h-100 p-2 bg-light border shadow rounded" id="page_menu">
//                         <SideMenu/>
//                     </div>
//                 </div>
//                 <div className="col-lg-10 py-2">
//                     <div className=" h-100 p-5 bg-light border shadow rounded">
//                         <table className="table">
//                             <thead>
//                                 <tr className="trth">
//                                     <th scope="col">글 제목</th>
//                                     <th scope="col">내가 단 댓글</th>
//                                     <th scope="col">댓글 쓴 날짜</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr className="trtd">
//                                     <td id="titleText"><a href="#">라면 공구해요!sdfsdfsdf</a></td>
//                                     <td id="titleText">무슨 라면인가요?</td>
//                                     <td>21.07.01 22:35</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

function comment() {
    return (
      <div className="Comment">
        <Header />
        <div className="comment__body">
          <Board/>
          <div style={{clear:"both"}}></div>
        </div>
        <Footer id="footerW"/>
      </div>
      
     )
 }
 export default comment
 