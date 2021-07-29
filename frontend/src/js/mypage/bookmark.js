import React from 'react';
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


// class="list-group-item list-group-item-action disabled" 

// function Board() {
//   return (
//     <div className="container py-4">

//       <div className="row align-items-md-stretch">
//         <div className="col-lg-12 py-2">
//           <div className=" h-100 p-5 bg-light border shadow rounded" id="page_title">
//           북마크
//           </div>
//         </div>
//       </div>

//       <div className="row align-items-md-stretch">

//         <div className="col-lg-2 py-2">
//           <div className=" h-100 p-2 bg-light border shadow rounded" id="page_menu">
//           <SideMenu/>
//           </div>
//         </div>
        
//         <div className="col-lg-10 py-2">
//           <div className=" h-100 p-5 bg-light border shadow rounded">
//           <Button id="delete">선택 삭제</Button>
//           <table className="table">
//           <thead>
//               <tr className="trth">
//               <th scope="col">#</th>
//               <th scope="col">마감일</th>
//               <th scope="col">글 제목</th>
//               <th scope="col">카테고리</th>
//               <th scope="col">참여자 수</th>
//               <th scope="col">진행상황</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="trtd">
//               <td scope="row">
//                 <input type="checkbox"/>
//               </td>
//               <td>21.07.01</td>
//               <td id="titleText"><a href="#">라면 공구해요!sdfsdfsdf</a></td>
//               <td>식품</td>
//               <td>3/5명</td>
//               <td>신청중</td>
//             </tr>
//           </tbody>
//         </table>
        
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
const { SearchBar } = Search;

let selectRowProp = {
  mode: "checkbox",
  clickToSelect: true,
  bgColor: "rgb(238, 193, 213)" 
};

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
      category: '식품',
      title: '닭가슴살 공동구매',
      num: '5/8',
      Progress: '신청중',
    },
    {
      id: 1,
      date: '21/07/20',
      category: '의류',
      title: '양말 공동구매',
      num: '5/7',
      Progress: '진행중',
    },
    {
      id: 2,
      date: '21/06/20',
      category: '전자제품',
      title: '아이폰 12 공동구매',
      num: '8/8',
      Progress: '종료',
    },
  ];

  columns = [{
    dataField: 'id',
    text: 'id',
    hidden: true,
  }, {
    dataField: 'date',
    text: '마감일',
    sort: true,
    headerStyle: () => {
      return { width: "13%" };
    }
  }, {
    dataField: 'category',
    text: '카테고리',
    headerStyle: () => {
      return { width: "15%" };
    }
  }, {
    dataField: 'title',
    text: '제목',
  }, {
    dataField: 'num',
    text: '참여자수',
    headerStyle: () => {
      return { width: "17%" };
    }
  }, {
    dataField: 'Progress',
    text: '진행상황',
    headerStyle: () => {
      return { width: "15%" };
    },
  }];
  
  render() {
    return (
      <div className="container py-4">

      <div className="row align-items-md-stretch">
        <div className="col-lg-12 py-2">
          <div className=" h-100 p-5 bg-light border shadow rounded" id="page_title">
            북마크
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
                selectRow={selectRowProp}
                noDataIndication="There is no solution"
                hover
                deleteRow
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

function bookmark() {
    return (
      <div className="Bookmark">
        <div className="bookmark">
          <Board/>
          <div style={{clear:"both"}}></div>
        </div>
      </div>
      
     )
 }
 export default bookmark
 