import '../../css/room.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Room = (props) => {

    const [endDealModal, setEndDealModal] = useState(false);
    const [rating, setRating] = useState('');

    function click() { // 채팅방 클릭
        props.onClick(props.chatroomId);
        // console.log("채팅방 " + this.props.chatroomId + "을 눌렀습니다.");
    }

    function handleRateChange(event) { // 평점 설정
        if(event.target.value < 0){
            event.target.value = 0;
            setRating(0);
        } else if(event.target.value > 100) {
            event.target.value = 100;
            setRating(100);
        } else {
            setRating(event.target.value);
        }
    }

    function endDeal() { // 거래 평점 및 종료
        props.endDeal(props.postId, rating);
        setEndDealModal(false);
    }


    return (
        <div className="room" key={props.chatroomId}>
            <div onClick={click}>
                <img className="roomImg" src="https://placeimg.com/50/50/any" alt="" />
                <span className="roomName">{props.roomName}</span>
            </div>
            <button className="btn btn-info endDealBtn" onClick={() => {setEndDealModal(true);}}>거래 평점 매기기</button>

            {/* 평점 저장용 모달 */}
            <Modal show={endDealModal} onHide={() => {setEndDealModal(false);}} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">[{props.roomName}] 거래를 종료하려면 평점을 남기세요.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>이번 거래는 100점 만점에 몇점?</p>
                    <input name="rating" type="number" max='100' min='0' required onChange={handleRateChange}/> 점
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setEndDealModal(false);}}>
                        취소
                    </Button>
                    <Button variant="secondary" onClick={endDeal}>
                        평점 저장
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

        
    )
}

export default Room;
