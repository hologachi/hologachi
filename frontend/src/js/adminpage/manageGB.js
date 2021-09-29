import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap';
import AdminNav from "./adminNav"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSearch from "./adminSearch"
import AdminService from '../services/AdminService'; //백엔드 연결

function ManageGB(){
    const [gbs, setGbs] = useState([]);

    const columns = [{
        dataField: 'ptcptId',
        text: '공동구매 ID',
      }, {
        dataField: 'post.title',
        text: '공동구매 글 제목'
      }, {
        dataField: 'post.user.nickname',
        text: '제안자'
      }, {
        dataField: 'user.nickname',
        text: '요청자'	
      }, {
        dataField: 'step',
        text: '진행 단계', 
        formatter: StepFormatter
      }, {
        dataField: 'rqstrRate',
        text: '요청자가 매긴 제시자 평점', 
        formatter: RateFormatter
      }, {
        dataField: 'sgstrRate',
        text: '제시자가 매긴 요청자 평점', 
        formatter: RateFormatter
      }, {
          dataField: 'stopGB',
          text: '거래 중지',
          formatter: StopGBButtonFormatter
      }
    ];	
    
    function RateFormatter(cell, row) {
        if (cell === '') {
            return "미등록";
        }
        return cell;
    }

    function StepFormatter(cell, row) {
        switch(cell) {
            case "request":
                return "요청";
            case "agree":
                return "수락";
            case "cancel":
                return "취소";
            case "reject":
                return "거절";
            case "finish":
                return "완료";
            case "stop":
                return "중지";
            default:
                return "알 수 없음";
        }   
    }

    function StopGBButtonFormatter(cell, row) {
        return (
            <Button variant="secondary" onClick={() => handleStopPtcpt(row.ptcptId)}>중지</Button>
        );
    }

    useEffect(
        () => {
            loadGBs();
        }, []
    );

    const loadGBs = () => {
        // 공동구매 전체 조회 
        AdminService.getAllGBs().then((res) => {
            setGbs(res.data);
            console.log(res.data);
        })   
    }

    const handleStopPtcpt = (ptcptId) => {
        // 공동구매 삭제
        AdminService.stopTheGB(ptcptId).then((res) => {
            loadGBs();
        })   
    }

    return (
        <div className="MGB">
        <div className="wrapper">
            <AdminNav />
            <div className="GBList">
            <h2>공동구매 목록</h2>
            <AdminSearch />
                {   gbs && <BootstrapTable keyField='ptcptId' data={ gbs } columns={ columns } striped hover condensed wrapperClasses="table-responsive" pagination={ paginationFactory() }/> }
           </div>
         </div>
        </div>
        );
 }
 export default ManageGB;