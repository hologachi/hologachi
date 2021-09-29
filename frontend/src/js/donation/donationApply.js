import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function DonationApply() {
    // useEffect(
    //     () => {
            
    //     }, []
    // );

    return (
        <div className="donationApply">
            
            <div className="donationApplyDescription">
                <h1>기부 신청하기</h1>
                <p>필요한 사람에게 기부하고 혜택 받아가세요</p>
            </div>

            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>성함</Form.Label>
                <Form.Control type="name" placeholder="성함을 입력하세요" />
                <Form.Text className="text-muted">
                기부 이외에는 이 정보를 사용하지 않습니다.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>연락처</Form.Label>
                <Form.Control type="phone" placeholder="ex. 010-1234-5678" />
                <Form.Text className="text-muted">
                기부 이외에는 이 정보를 사용하지 않습니다.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>물품 종류</Form.Label>
                <Form.Control type="product" placeholder="ex. 휴지, 쌀" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>기부방법</Form.Label>
                <Form.Control type="" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>기부금 영수증 발급 여부</Form.Label>
                <Form.Control type="" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>

        </div>
    );
}

export default DonationApply;