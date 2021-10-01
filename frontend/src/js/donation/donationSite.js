import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DonationService from '../services/DonationService';
import { Form, Button } from 'react-bootstrap';

function DonationSite() {

    const [sites, setSites] = useState([]);

    const columns = [{
        dataField: 'dSiteId',
        text: '기부사이트 ID',
      }, {
        dataField: 'name',
        text: '기부사이트 명'
      }, {
        dataField: 'site',
        text: '기부사이트 주소'
      }, {
        dataField: 'description',
        text: '기부사이트 설명'
      }, {
        dataField: 'logo',
        text: '기부사이트 로고'
      }
    ];	
    
    useEffect(
        () => {
            LoadDonationSite();
        }, []
    );

    function LoadDonationSite() {
        DonationService.getDonationSites().then((res) => {
            setSites(res.data);
            console.log(res.data);
        });
    }

    return (
        <div className="donationSite">
            <div className="donationSiteListDescription">
                <h2>물품 기부 사이트</h2>
                <p></p>
            </div>
            {   sites && <BootstrapTable keyField='siteId' data={ sites } columns={ columns } striped hover condensed wrapperClasses="table-responsive" pagination={ paginationFactory() }/> }
        </div>
    );
}

export default DonationSite;