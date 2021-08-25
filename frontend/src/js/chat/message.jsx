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
                        <p className="messageText">{this.props.message}</p>
                    </div>
                    <div className="messageBottom">{this.props.sendAt}초 전</div>
                </div>
            </div>
        )
    }
}

export default Message
