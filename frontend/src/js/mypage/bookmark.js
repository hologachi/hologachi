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
import productsData from "../ProductData";
import { Link } from "react-router-dom";

const { SearchBar } = Search;

const productFormatter = () => {
  const products = productsData.map(product => {
  return (
    <Link to={`/gb/gbdetail/${product.id}`}>상세보기</Link>
  );
});
return(
  <div>
 {products}
  </div>
 
)
}

let selectRowProp = {
  mode: "checkbox",
  clickToSelect: true,
  bgColor: "rgb(238, 193, 213)"
};

class Board extends React.Component {

  columns = [{
    dataField: 'id',
    text: 'id',
    hidden: true,
  }, {
    dataField: 'finishdate',
    text: '마감일',
    sort: true,
    headerStyle: () => {
      return { width: "17%" };
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
    dataField: 'goalnum',
    text: '참여자수',
    headerStyle: () => {
      return { width: "13%" };
    }
  }, {
    dataField: 'status',
    text: '진행상황',
    headerStyle: () => {
      return { width: "13%" };
    },
  },{
    dataField: 'follow',
    text: '',
    headerStyle: () => {
      return { width: "13%" };
    },
    formatter: productFormatter
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
            <div className=" h-100 p-5 bg-light border shadow rounded" id="boottable">
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={productsData}
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
                      pagination={paginationFactory({ sizePerPage: 10, display: 'flex' })}
                    >
                    </BootstrapTable>
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
        <Board />
        <div style={{ clear: "both" }}></div>
      </div>
    </div>

  )
}
export default bookmark
