import '../../css/room.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Room = (props) => {

    const [endDealModal, setEndDealModal] = useState(false);

    function click() {
        props.onClick(props.chatroomId);
        // console.log("채팅방 " + this.props.chatroomId + "을 눌렀습니다.");
    }

    function endDeal() {
        setEndDealModal(true);

        // props.onClickEndDeal();
    }


    return (
        <div className="room" key={props.chatroomId} onClick={click}>
            <img className="roomImg" src="https://placeimg.com/50/50/any" alt="" />
            <span className="roomName">{props.roomName}</span>
            <button className="btn btn-info endDealBtn" onClick={endDeal}>거래 종료하기</button>

            {/* 평점 저장용 모달 */}
            <Modal show={endDealModal} onHide={() => {setEndDealModal(false);}} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">[{props.roomName}] 거래를 종료하려면 평점을 남기세요.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {props.users.map((user, i) =>  {
                            if(user.userId != sessionStorage.getItem('userId')) {
                                return <li key={i}>{user.nickname} <input type="number"></input></li>
                            }
                        })}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setEndDealModal(false);}}>
                        취소
                    </Button>
                    <Button variant="secondary" onClick={() => {setEndDealModal(false);}}>
                        평점 저장
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

        
    )
}

export default Room;
