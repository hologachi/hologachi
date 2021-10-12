import '../../css/donation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";
import { Card, Button } from 'react-bootstrap';
import DonationService from '../services/DonationService';

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
                <h2>물품기부 사이트</h2>
                <p></p>
            </div>
            
            <div className="donationCard" >
            <Grid container spacing={4}>
            { sites && sites.length > -1 ? 
                (sites.map(site => 
                    <Grid item xs={6} sm={3}>
                    <Card style={{ margin: '0px' }}>
                    <Card.Img variant="top" src={site.logo} alt={site.name} style={{ padding:'20px' }}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                        {site.description}
                        </Card.Text>
                        <Button variant="primary" href={site.site}>사이트로 이동</Button>
                        </Card.Body>
                    </Card> 
                    </Grid>
                )) : ( <h1>No results found!</h1>)
            }
            </Grid>
            </div>

        </div>
    );
}

export default DonationSite;