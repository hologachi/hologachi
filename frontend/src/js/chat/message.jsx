import '../../css/message.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Message extends Component {
    render() {
        const own = this.props.own

        return (
            <div className={own ? "message own" : "message"}>
                <div className="message">
                    <div className="messageTop">
                        <img className="messageImg" src="https://placeimg.com/50/50/any" alt="" />
                        <div className="messageData">
                            <span className="messageSender">{this.props.sender}</span>
                            <p className="messageText">{this.props.message}</p>
                            <span className="messageSendAt">{this.props.sendAt}에 전송</span>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

export default Message
