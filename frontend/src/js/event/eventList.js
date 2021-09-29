import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

function EventList() {

    const [events, setEvents] = useState(
        [{title: '자라 신년세일', brand:'Zara', desription:"2021년 세일", duration: "2021.09.30 ~ 2021.10.05", site:"https://www.zara.com/kr/"}]
    );

    // useEffect(
    //     () => {
     
    //     }, []
    // );

    return (
        <div className="eventList">

            <div className="eventListDescription">
                <h2>브랜드 이벤트 안내</h2>
                <p>브랜드 공식 사이트에서 진행하는 이벤트 정보를 제공합니다</p>
            </div>

            { events && events.length > -1 ? (
                events.map((event, i) => 
                <Card style={{ width: '20rem', height: '30rem' }}>
                <Card.Img variant="top" src="https://placeimg.com/50/50/any" />
                <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                    {event.desription}
                    <br/>
                    {event.duration}
                    </Card.Text>
                    <Button variant="primary" href={event.site}>{event.brand}</Button>
                </Card.Body>
                </Card>)
                ) : ( <h1>No results found!</h1>)
            }

        </div>
    );

}
export default EventList;