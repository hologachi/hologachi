import '../../css/donation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import DonationService from '../services/DonationService';

function DonationApply() {

    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [product, setProduct] = useState('');
    const [receipt, setReceipt] = useState(false);

    const handleNameChange = (e) => {
        setName( e.target.value)
      }

    const handlePhoneChange = (e) => {
        setPhone( e.target.value)
      }

    const handleProductChange = (e) => {
        setProduct( e.target.value)
      }
    const handleReceiptChange = (e) => {
        setReceipt( e.target.value)
      }

    // useEffect(
    //     () => {
            
    //     }, []
    // );
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        console.log(form.value);
        
        setValidated(true);
        sendDonationApplyForm();
    };

    function sendDonationApplyForm() {
        const data = {name: name, phone: phone, product: product, receipt: receipt};

        DonationService.applyDonation(userId, data)
        .then((res) => { 
            alert("기부 신청이 등록되었습니다.")
            window.location.href="/donation/apply"
        }).catch(error => {
            console.log(error.response)
        });
    }

    return (
        <div className="donationApply">
            
            <div className="donationApplyDescription">
                <h1>기부 신청하기</h1>
                <p>필요한 사람에게 기부하고 혜택 받아가세요</p>
            </div>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>성함</Form.Label>
                <Form.Control name="name" value={name} onChange={handleNameChange} placeholder="성함을 입력하세요" size="lg" required/>
                <Form.Control.Feedback>저장되었습니다</Form.Control.Feedback>
                <Form.Text className="text-muted">
                기부 이외에는 이 정보를 사용하지 않습니다.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>연락처</Form.Label>
                <Form.Control name="phone" value={phone} onChange={handlePhoneChange} placeholder="ex. 010-1234-5678" size="lg" required/>
                <Form.Control.Feedback>저장되었습니다</Form.Control.Feedback>
                <Form.Text className="text-muted">
                기부 이외에는 이 정보를 사용하지 않습니다.
                </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>물품 종류</Form.Label>
                <Form.Control name="product" value={product} onChange={handleProductChange} placeholder="ex. 휴지, 마스크" size="lg" required/>
                <Form.Control.Feedback>저장되었습니다</Form.Control.Feedback>
                <Form.Text className="text-muted">
                새 상품만 기부할 수 있습니다.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>기부금 영수증 발급 여부</Form.Label>
                <Form.Control as="select" value={receipt} onChange={handleReceiptChange} size="lg" custom required>
                <option value="true">네</option>
                <option value="false">아니요</option>
                </Form.Control>
                <Form.Control.Feedback>저장되었습니다</Form.Control.Feedback>
            </Form.Group>
                            

            <Button variant="primary" onClick={sendDonationApplyForm}>신청하기</Button>

            </Form>

        </div>
    );
}

export default DonationApply;