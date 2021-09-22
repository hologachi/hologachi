import '../../css/message.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Message = (props) => {
    
    const own = props.own;

    function calcSendAt(sendAt) { // 1분 미만이면 초 단위를, 이외에는 yyyy.MM.dd 단위로 계산
        var now = Date.now();
        var elapsedTime = (now - sendAt) / 1000;

        if(elapsedTime < 60) {
            return elapsedTime;
        } else {
            var time = new Date(sendAt)
            return time.getFullYear() + '.' + ('0' + (time.getMonth() + 1)).slice(-2) + '.' + ('0' + time.getDate()).slice(-2) + ' ' + ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2) + '';
        }
    }

    return (
        <div className={own ? "message own" : "message"}>
            <div className="message">
                <div className="messageTop">
                    <img className="messageImg" src="https://placeimg.com/50/50/any" alt="" />
                    <div className="messageData">
                            <span className="messageSender">{props.sender}</span>
                            <p className="messageText">{props.message}</p>
                            <span className="messageSendAt">{calcSendAt(props.sendAt)}</span>
                        </div>    
                </div>
            </div>
        </div>
    )
}

export default Message;
