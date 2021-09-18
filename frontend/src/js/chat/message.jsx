import '../../css/message.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Message = (props) => {
    
    const own = props.own;

    return (
        <div className={own ? "message own" : "message"}>
            <div className="message">
                <div className="messageTop">
                    <img className="messageImg" src="https://placeimg.com/50/50/any" alt="" />
                    <div className="messageData">
                            <span className="messageSender">{props.sender}</span>
                            <p className="messageText">{props.message}</p>
                            <span className="messageSendAt">{props.sendAt}에 전송</span>
                        </div>    
                </div>
            </div>
        </div>
    )
}

export default Message;
