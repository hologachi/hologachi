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

class Board extends React.Component{
  products = [
    {
      id: 0,
      date: '21/07/25',
      category: '식품',
      title: '닭가슴살 공동구매',
      proposer: 'hologachi',
      Progress: '신청중',
    },
    {
      id: 1,
      date: '21/07/20',
      category: '의류',
      title: '양말 공동구매',
      proposer: 'abc',
      Progress: '진행중',
    },
    {
      id: 2,
      date: '21/06/20',
      category: '전자제품',
      title: '아이폰 12 공동구매',
      proposer: 'apple',
      Progress: '종료',
    },
    {
      id: 3,
      date: '21/08/10',
      category: '전자제품',
      title: '애플펜슬',
      proposer: 'apple',
      Progress: '신청중',
    },
    {
      id: 4,
      date: '21/08/01',
      category: '식품',
      title: '신라면',
      proposer: '농심',
      Progress: '종료',
    }
  ];

  columns = [{
    dataField: 'id',
    text: 'id',
    hidden: true,
  }, {
    dataField: 'date',
    text: '신청일',
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
    dataField: 'proposer',
    text: '제안자',
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
            신청한 글
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


function applygb() {
  return (
    <div className="Appltgb">
      <Header />
      <div className="appltgb__body">
        <Board />
        <div style={{ clear: "both" }}></div>
      </div>
      <Footer id="footerW" />
    </div>

  )
}
export default applygb
