import '../../css/donation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import paginationFactory from 'react-bootstrap-table2-paginator';
import DonationService from '../services/DonationService';

function MyDonation() {
    const [myDonation, setMyDonation] = useState([]);

    useEffect(
        () => {
            LoadMyDonation();
        }, []
    );

    function LoadMyDonation() {
        // 기부 내역  
        DonationService.getMyDonation(sessionStorage.getItem('userId'))
        .then((res) => {
            setMyDonation(res.data);
            console.log(myDonation);
        }).catch(error => {
            console.log(error.response)
        });  
    }

    const columns = [{
        dataField: 'name',
        text: '기부자 성함'
      }, {
        dataField: 'phone',
        text: '연락처'
      }, {
        dataField: 'product',
        text: '물품'
      }, {
        dataField: 'receipt',
        text: '기부 영수증',
        formatter: ReceiptFormatter	
      }
    ];	

    function ReceiptFormatter(cell, row) {
        switch(cell){
            case true:
                return "신청";
            case false:
                return "미신청";
        }
    }

    return (
        <div className="myDonation">

            <div className="myDonationDescription">
                <h2>나의 기부, 나의 행복</h2>
                <p>{window.sessionStorage.getItem('nickname')}님이 현재까지 진행한 기부입니다.</p>
            </div>

            <div className="myDonationList">
            { myDonation && myDonation.length > 0 ?
                (<BootstrapTable keyField='donationId' data={ myDonation } columns={ columns } wrapperClasses="table-responsive" 
                // pagination={ paginationFactory() }
                />)
                : ( <h1>결과가 없습니다.</h1> )
            }
            </div>

        </div>
    );
}

export default MyDonation;