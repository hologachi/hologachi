import '../../css/brandEvent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";
import { Card, Button } from 'react-bootstrap';
import BrandEventService from '../services/BrandEventService';

function BrandEventList() {

    const [brandEvents, setBrandEvents] = useState(
        [{title: '1자라 신년세일', img:"", brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}, 
        {title: '2자라 신년세일', img:"",  brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}, 
        {title: '3자라 신년세일', img:"",  brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}, 
        {title: '4자라 신년세일', img:"",  brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}, 
        {title: '5자라 신년세일', img:"",  brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}, 
        {title: '6자라 신년세일', img:"",  brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}, 
        {title: '7자라 신년세일', img:"",  brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}, 
        {title: '8자라 신년세일', img:"",  brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}, 
        {title: '9자라 신년세일', img:"",  brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}]
    );

    useEffect(
        () => {
            LoadBrandEvent();
        }, []
    );

    function LoadBrandEvent() {
        // 이벤트 목록
        BrandEventService.getBrandEvent().then((res) => {
            setBrandEvents(res.data);
            console.log(res.data);
        })   
    }

    return (
        <div className="brandEventList" >

            <div className="brandEventListDescription">
                <h2>브랜드 이벤트 안내</h2>
                <p>해당 브랜드 공식사이트에서 안내하는 이벤트입니다</p>
            </div>

            <div className="BrandEventCard" >
            <Grid container spacing={4}>
            { brandEvents && brandEvents.length > -1 ? 
                (brandEvents.map((event, i) => 
                    <Grid item xs={6} sm={3}>
                    <Card style={{ margin: '0px' }}>
                    <Card.Img variant="top" src={event.img}/>
                    <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text>
                        {event.description}
                        <br/>
                        {event.startEvent} ~ {event.endEvent}
                        </Card.Text>
                        <Button variant="primary" href={event.site}>{event.brandName}</Button>
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
export default BrandEventList;