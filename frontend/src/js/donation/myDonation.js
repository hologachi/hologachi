import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import DonationService from '../services/DonationService';
// import {  } from 'react-bootstrap';

function MyDonation() {
    const [myDonation, setMyDonation] = useState([]);

    useEffect(
        () => {
            LoadMyDonation();
        }, []
    );

    function LoadMyDonation() {
        // 기부 내역  
        DonationService.getMyDonation().then((res) => {
            setMyDonation(res.data);
            console.log(res.data);
        })   
    }

    return (
        <div className="myDonationList">

            <div className="myDonationListDescription">
                <h2>나의 기부, 나의 행복</h2>
                <p>{window.sessionStorage.getItem('nickname')}님이 현재까지 진행한 기부입니다.</p>
            </div>

            { myDonation && myDonation.length > -1 ?
                myDonation.map((d, i) => 
                <p>{d.id}</p> )
                : ( <h1>결과가 없습니다.</h1> )
            }

        </div>
    );
}

export default MyDonation;